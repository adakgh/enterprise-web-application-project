import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {CurrentUserService} from '../../services/current-user.service';
import {LoginData} from '../../models/login-data.model';
import {LoginService} from '../../services/login.service';
import {RouteUtil} from '../../utils/route.util';
import {RegisterService} from '../../services/register.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginData: LoginData = {};
    loginErrMsg = '';

    selected: boolean;
    registerForm: FormGroup;
    submitted = false;

    constructor(private router: Router,
                private routeUtil: RouteUtil,
                private formBuilder: FormBuilder,
                private authService: AuthService,
                private currentUserService: CurrentUserService,
                private loginsService: LoginService,
                private registerService: RegisterService) {
    }

    // getting the form controls
    // tslint:disable-next-line:typedef
    get f() {
        return this.registerForm.controls;
    }

    ngOnInit(): void {
        this.authService.deleteAuthentication(); // force a logout;
        // register form validation
        this.buildForm();
        this.setTypeValidators();

        // TODO: remove after testing --> test values for input fields
        // this.loginData.username = 'myUsername@gmail.com';
        // this.loginData.password = 'myPassword1!';
    }

    login(): void {
        this.loginsService.isLocked(this.loginData.username).subscribe(
            resp => {
                // if account is not locked log the user in
                if (resp === false) {
                    console.log(this.loginData);
                    this.loginsService.requestAccessToken(this.loginData).subscribe(
                        res => this.navToHomepage(),
                        err => this.loginErrMsg = 'E-mail of wachtwoord is niet correct'
                    );
                } else if (resp === true){
                    // if account is locked give alert
                    alert('Verifieer eerst jouw e-mailadres om gebruik te maken van het account!');
                } else if (resp === null){
                    this.loginErrMsg = 'E-mail of wachtwoord is niet correct';
                }
            }, err => console.log(err));
    }

    LoginRememberMe(values: any): void {
        if (values.currentTarget.checked) {
            this.routeUtil.addParam('rememberMe', 'true');
        } else {
            this.routeUtil.clearParams();
        }
    }

    navToHomepage(): void {
        this.router.navigate(['/']).then(() => {
            window.location.reload();
        });
    }

    selectInput(event): void {
        const selected = event.target.value;

        if (selected === 'customer') {
            this.selected = false;
        } else if (selected === 'supplier') {
            this.selected = true;
        }
    }

    register(): void {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        } else {
            const user = this.registerForm.value;

            // body construction based on choice
            let body = {};
            if (user.type === 'customer') {
                body = {
                    fullname: user.firstName + ' ' + user.lastName,
                    username: user.email,
                    password: user.password,
                    roles: [{id: 3}]
                };
            } else if (user.type === 'supplier') {
                body = {
                    fullname: user.company,
                    username: user.email,
                    password: user.password,
                    roles: [{id: 2}],
                    supplier: {companyName: user.company}
                };
            }

            // register the user
            this.registerService.register(body).subscribe(
                res => {
                    alert('Het registreren is gelukt. Volg de aanwijzingen in de verificatiemail verstuurd naar jouw e-mailadres.');
                    this.router.navigate(['/login']).then(() => {
                        window.location.reload();
                    });
                }, err => {
                    console.log(err);
                    if (err.status === 409) {
                        alert('Dit e-mailadres is al in gebruik. Probeer het opnieuw.');
                    } else {
                        alert('Er is iets misgegaan. Probeer het opnieuw.');
                    }
                }
            );
        }
    }

    // checking if password and repeat password fields match
    mustMatch(controlName: string, matchingControlName: string): any {
        return (formGroup: FormGroup) => {
            const password = formGroup.controls[controlName];
            const confirmedPassword = formGroup.controls[matchingControlName];

            if (confirmedPassword.errors && !confirmedPassword.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if (password.value !== confirmedPassword.value) {
                confirmedPassword.setErrors({mustMatch: true});
            } else {
                confirmedPassword.setErrors(null);
            }
        };
    }

    buildForm(): void {
        this.registerForm = this.formBuilder.group({
            type: ['customer'],
            company: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('[^\\w\\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))')]],
            confirmPassword: ['', Validators.required]
        }, {
            validator: this.mustMatch('password', 'confirmPassword')
        });
    }

    setTypeValidators(): void {
        const type = this.registerForm.get('type');
        const company = this.registerForm.get('company');
        const firstName = this.registerForm.get('firstName');
        const lastName = this.registerForm.get('lastName');

        // type of user is always first customer, so company name field is not required
        if (type.value === 'customer') {
            firstName.setValidators([Validators.required]);
            lastName.setValidators([Validators.required]);
            company.setValidators(null);
        }

        // if type of user changes to supplier, first and lastname fields are not required
        this.registerForm.get('type').valueChanges
            .subscribe(changedType => {
                if (changedType === 'supplier') {
                    company.setValidators([Validators.required]);
                    firstName.setValidators(null);
                    lastName.setValidators(null);
                }

                // if type changes again to customer
                if (type.value === 'customer') {
                    firstName.setValidators([Validators.required]);
                    lastName.setValidators([Validators.required]);
                    company.setValidators(null);
                }

                company.updateValueAndValidity();
                firstName.updateValueAndValidity();
                lastName.updateValueAndValidity();
            });

    }
}

