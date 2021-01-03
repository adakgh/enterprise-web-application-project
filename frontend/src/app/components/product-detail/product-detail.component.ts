import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {RouteUtil} from '../../utils/route.util';
import {ProductService} from '../../services/product.service';
import {DemoImage} from '../supplier-info/supplier-info-edit/default-image';
import {CurrentUserService} from "../../services/current-user.service";
import {ContactService} from "../../services/contact.service";

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

    jsonData: any[] = [];
    price;
    type;

    submitted: boolean;
    purchaseAmount;

    constructor(
        private router: Router,
        private apiService: ApiService,
        private routeUtil: RouteUtil,
        private productService: ProductService,
        public demoImage: DemoImage,
        private currentUser: CurrentUserService,
        private contactService: ContactService
    ) {
    }

    ngOnInit(): void {
        this.productService.getAllProduct().subscribe(
            res => {
                console.log(res);
                this.jsonData = res.content;
            },
            err => {
                console.log(err);
            }
        );
    }

    /** Send Factuur mail */
    sendMail(): void {
        this.submitted = true;

        const message = {
            receiverEmail: this.jsonData[0].supplierEmail,
            supplierName: this.jsonData[0].supplierName,
            senderMail: this.currentUser.getUsername(),
            productName: this.jsonData[0].name,
            quantity: this.purchaseAmount,
            unit: this.jsonData[0].unit,
            pricePerUnit: this.jsonData[0].price,
            totalPrice: (this.purchaseAmount * this.jsonData[0].price).toFixed(2),
        };

        console.log(message);

        this.contactService.requestFactuur(message).subscribe(res => {
            console.log(res);
            alert('Factuur aanvraag is verzonden, de verkoper zal snel mogelijk contact met u opnemen!');
            /*this.router.navigate(['/contact']).then(() => {
                window.location.reload();
            });*/
        }, err => {
            console.log(err);
            alert('Er is iets misgegaan. Probeer het opnieuw.');
        });
    }

}
