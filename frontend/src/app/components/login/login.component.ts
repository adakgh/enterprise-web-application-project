import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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
    companyGroup: FormControl;
    submitted = false;
    ngForm;

    ngOnInit(): void {
        // remove token --> logout
        sessionStorage.removeItem('currentUser');

        // register form validation
        if (!this.selected) {
            this.registerForm = this.formBuilder.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', Validators.required]
            }, {
                validator: this.MustMatch('password', 'confirmPassword')
            });
        } else if (this.selected) {
            this.registerForm = this.formBuilder.group({
                // TODO: check if company name is valid

                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', Validators.required],
            }, {
                validator: this.MustMatch('password', 'confirmPassword')
            });
        }
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
            // temporary register
            this.login();
        }
    }

    MustMatch(controlName: string, matchingControlName: string) {
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
}
