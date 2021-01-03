import {Component, OnInit} from '@angular/core';
import {ContactService} from '../../services/contact.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    contactForm: FormGroup;
    submitted = false;

    constructor(private contactService: ContactService, private router: Router) {
    }

    ngOnInit(): void {
        // scroll to the top of page after fully loading
        window.scrollTo(0, 0);

        this.contactForm = new FormGroup({
            name: new FormControl(''),
            email: new FormControl('', [Validators.required, Validators.email]),
            subject: new FormControl('', Validators.required),
            message: new FormControl('', Validators.required),
        });
    }

    // tslint:disable-next-line:typedef
    get f() {
        return this.contactForm.controls;
    }

    sendMail(): void {
        this.submitted = true;
        if (this.contactForm.invalid) {
            return;
        } else {
            const message = {
                name: this.contactForm.value.name,
                subject: this.contactForm.value.subject,
                email: this.contactForm.value.email,
                message: this.contactForm.value.message
            };

            console.log(message);

            this.contactService.sendMail(message).subscribe(res => {
                console.log(res);
                alert('Email is verzonden. We proberen zo snel mogelijk te reageren.');
                this.router.navigate(['/contact']).then(() => {
                    window.location.reload();
                });
            }, err => {
                console.log(err);
                alert('Er is iets misgegaan. Probeer het opnieuw.');
            });
        }
    }

}
