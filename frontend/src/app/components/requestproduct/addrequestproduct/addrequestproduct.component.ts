import {Component, OnInit} from '@angular/core';
import {InquiryService} from '../../../services/inquiry.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-addrequestproduct',
    templateUrl: './addrequestproduct.component.html',
    styleUrls: ['./addrequestproduct.component.css']
})
export class AddrequestproductComponent implements OnInit {
    inquiry: any = {};
    category: any[] = [];

    constructor(private router: Router,
                private requestsService: InquiryService) {
    }

    ngOnInit(): void {
        // getting inquiry categories
        this.requestsService.getAllInquiryCategories().subscribe(
            res => {
                this.category = res;
            },
            err => {
                console.log(err);
            });
    }

    postRequest(): void {
        console.log(this.inquiry);

        // if fields are empty
        if (Object.keys(this.inquiry).length === 0 || !this.inquiry.hasOwnProperty('message') ||
            !this.inquiry.hasOwnProperty('categoryId') || this.inquiry.message.length <= 0) {
            alert('Vul alle velden in.');
        } else {
            // create an inquiry
            this.requestsService.addInquiry(this.inquiry).subscribe(
                res => {
                    alert('De aanvraag is verstuurd!');
                    this.navToProducts();
                }, err => {
                    console.log(err);
                    alert('Er is iets misgegaan. Probeer het opnieuw.');
                }
            );
        }
    }

    navToProducts(): void {
        this.router.navigate(['/products']).then(() => {
            window.location.reload();
        });
    }
}
