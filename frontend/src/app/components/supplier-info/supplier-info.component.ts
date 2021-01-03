import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {RouteUtil} from '../../utils/route.util';
import {SupplierInfoService} from '../../services/supplier-info.service';
import {CurrentUserService} from '../../services/current-user.service';
import {DemoImage} from './supplier-info-edit/default-image';

@Component({
    selector: 'app-supplier-info',
    templateUrl: './supplier-info.component.html',
    styleUrls: ['./supplier-info.component.css']
})
export class SupplierInfoComponent implements OnInit {

    jsonSupplierData = { // Object with the data of the supplier
        addresses: null,
        companyName: '',
        contactEmail: '',
        contactPerson: '',
        description: null,
        id: 1,
        phoneNumber: null,
        products: null,
        profileImage: null,
        shortDescription: null,
        website: null,
    };
    jsonLimitedProductsData: any[] = [];    // Limited object with only 4 products
    generatedImage: string;                 // The profile image src of the supplier

    // Inject needed classes
    constructor(
        private router: Router,
        private apiService: ApiService,
        private routeUtil: RouteUtil,
        private supplierInfoService: SupplierInfoService,
        private activatedRoute: ActivatedRoute,
        public currentUserService: CurrentUserService,
        public demoImage: DemoImage
    ) {
    }

    // Subscribe to the query parameters in the URL and load data of supplier with id if there is a supplier
    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(
            res => {
                // If there is no query given return user to homepage
                /*if (res.id <= 0 || res.id == null) {
                    this.router.navigate(['/']);
                    return;
                }*/
                this.loadSupplierData(res.id);
            },
            err => {
                console.log('Can not find endPoint' + err);
            });
    }

    // Get all information about the supplier with the given id in the query
    loadSupplierData(id: number): void {
        this.supplierInfoService.getSupplier(id).subscribe(res => {
                const LIMIT_PRODUCTS = 4;
                this.jsonSupplierData = res;

                // Limit the shown product to 4 by making de jsonData smaller
                let productsLength = res.products.length;
                if (productsLength > LIMIT_PRODUCTS) {
                    productsLength = LIMIT_PRODUCTS;
                }
                for (let i = 0; i < productsLength; i++) {
                    this.jsonLimitedProductsData.push(res.products[i]);

                    // Posible if there is child component
                    /*if (this.jsonLimitedProductsData[i].productImage.picByte != null) {
                        this.generatedImage = atob(this.jsonLimitedProductsData[i].productImage.picByte);
                    } else {
                        this.generatedImage = this.demoImage.imageBase64Url;
                    }*/
                }

                if (res.profileImage != null) {
                    this.generatedImage = atob(res.profileImage.picByte);
                } else {
                    // Get the default image and put in src
                    // this.demoImage.getImage(this.demoImage.imageBase64Url);
                    this.generatedImage = this.demoImage.imageBase64Url;
                }
            },
            err => {
                console.log(err);
            }
        );
    }

    // Just a helper method to combines all adress detail into one String
    concatAddress(): string {
        return this.jsonSupplierData.addresses[0].street + ' ' + this.jsonSupplierData.addresses[0].number + ', ' +
            this.jsonSupplierData.addresses[0].postalCode + ' ' + this.jsonSupplierData.addresses[0].city;
    }

    // Link click event that refers user to the page with all product the current supplier is offering
    allProducts(): void {
        this.router.navigate(['myproducts'], {queryParams: {id: this.jsonSupplierData.id}});
    }
}
