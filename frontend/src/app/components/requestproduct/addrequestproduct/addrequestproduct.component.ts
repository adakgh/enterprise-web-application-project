import {Component, OnInit} from '@angular/core';
import {InquiryService} from '../../../services/inquiry.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-addrequestproduct',
    templateUrl: './addrequestproduct.component.html',
    styleUrls: ['./addrequestproduct.component.css']
})
export class AddrequestproductComponent implements OnInit {
    inquiry: any = {inquiryCategory: {}};
    category: any[] = [];

    // TODO: form validation

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

        // create an inquiry
        this.requestsService.addInquiry(this.inquiry).subscribe(
            res => {
                console.log(res);
                alert('De aanvraag is verstuurd!');
                this.navToProducts();
            }, err => {
                console.log(err);
                alert('Er is iets misgegaan. Probeer het opnieuw.');
            }
        );
    }

    navToProducts(): void {
        this.router.navigate(['/products']);
    }

}
