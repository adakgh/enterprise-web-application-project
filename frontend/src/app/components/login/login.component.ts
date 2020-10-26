import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private apiService: ApiService, private router: Router, private formBuilder: FormBuilder) {
        // test values for the input fields
        this.model.username = 'user@gmail.com';
        this.model.password = 5678;
    }

    model: any = {};
    errMsg = '';

    selected: boolean;
    registerForm: FormGroup;
    submitted = false;
    ngForm;

    ngOnInit(): void {
        // remove token --> logout
        sessionStorage.removeItem('currentUser');

        // register form validation
        this.buildForm();
        this.setTypeValidators();
    }

    login(): void {
        this.apiService.post('/login', this.model).subscribe(
            resp => {
                if (resp.token == null) {
                    this.errMsg = 'E-mail of wachtwoord is niet correct';
                    return;
                }
                // save responseInfo (token, role, ...) for client-side routes
                sessionStorage.setItem('currentUser', JSON.stringify(resp));
                this.router.navigate(['/']).then(() => {
                    window.location.reload();
                });
            }, errResp => {
                this.errMsg = errResp.status;
            }
        );
    }

    selectInput(event): void {
        const selected = event.target.value;

        if (selected === 'customer') {
            this.selected = false;
        } else if (selected === 'supplier') {
            this.selected = true;
        }
    }

    // getting the form controls
    // tslint:disable-next-line:typedef
    get f() {
        return this.registerForm.controls;
    }

    register(): void {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        } else {
            console.log(this.registerForm.value);

            // temporary register
            // TODO
            this.login();
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

