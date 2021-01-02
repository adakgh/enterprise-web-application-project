import {Component, OnInit} from '@angular/core';
import {ContactService} from '../../services/contact.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    contactForm: FormGroup;
    submitted = false;

    constructor(private contactService: ContactService) {
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
            const message = [this.contactForm.value.name,
                this.contactForm.value.subject,
                this.contactForm.value.email,
                this.contactForm.value.message];

            console.log(message);

            this.contactService.sendMail(message).subscribe(res => {
                console.log(res);
                alert('Email is verzonden. We proberen zo snel mogelijk te reageren.');
                this.contactForm.reset();
            }, err => {
                console.log(err);
                alert('Er is iets misgegaan. Probeer het opnieuw.');
            });
        }
    }

}
