import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {RouteUtil} from '../../utils/route.util';
import {ProductService} from '../../services/product.service';
import {FormBuilder} from '@angular/forms';
import {DemoImage} from '../supplier-info/supplier-info-edit/default-image';
import {CurrentUserService} from '../../services/current-user.service';
import {AuthService} from '../../services/auth.service';
import {LocationService} from '../../services/location.service';
import randomLocation from 'random-location';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    jsonData: any[] = [];
    categoryMap: any[] = [];
    selectedCategories: any = [];
    priceRangeForm;

    productLatLongs: any[] = [];

    position: {
        latitude: number,
        longitude: number,
    };

    constructor(
        private router: Router,
        private apiService: ApiService,
        private routeUtil: RouteUtil,
        private productService: ProductService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        public demoImage: DemoImage,
        public currentUserService: CurrentUserService,
        public authService: AuthService,
        private locationService: LocationService
    ) {
    }

    ngOnInit(): void {
        this.priceRangeForm = this.formBuilder.group({
            min: '',
            max: '',
        });
        this.routeUtil.clearParams();
        this.activatedRoute.queryParamMap.subscribe(
            res => {
                this.loadData();
                console.log(res);
            }
        );
        this.productService.getAllCategories().subscribe(
            res => {
                this.categoryMap = res;
            },
            err => {
                console.log(err);
            }
        );
        this.getCurrentAddress();
    }

    loadData(): void {
        this.productService.getAllProduct().subscribe(
            res => {
                this.jsonData = res.content;
                // get the geolocation of the products
                this.getProductLocations(res.content);
            },
            err => {
                console.log(err);
            }
        );
    }

    searchValue(values: any): void {
        if (values.target.value !== '') {
            this.routeUtil.addParam('name', '*' + values.target.value + '*');
        } else {
            this.routeUtil.deleteParam('name');
        }
    }

    sortProducts(values: any): void {
        if (values.target.value === 'location') {
            this.sortProductsOnDistance();
        } else if (values.target.value !== '') {
            this.routeUtil.addParam('sort', values.target.value);
        } else {
            this.routeUtil.deleteParam('sort');
        }
    }

    getProductLocations(allData): void {
        // empty productLatLong array
        this.productLatLongs = [];
        for (const product of allData) {
            this.locationService.getAddressInfo(product.supplierPostalCode).subscribe(
                (data) => {
                    console.log(product.supplierPostalCode);
                    console.log(data);
                    if (data) {
                        this.productLatLongs.push({
                            latitude: data.lat,
                            longitude: data.long,
                        });
                    } else {
                        console.log('Unable to find address');
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }

    sortProductsOnDistance(): void {
        const productDistance: any[] = [];
        // set the distace of the supplier per product with the product id
        console.log('All lat and longs of all the products');
        console.log(this.productLatLongs);
        for (let i = 0; i < this.productLatLongs.length; i++) {
            productDistance.push({
                productId: this.jsonData[i].id,
                distance: Math.round(randomLocation.distance(this.productLatLongs[i], this.position))
            });
        }

        // sort the new array by the distance
        productDistance.sort(this.compare);
        console.log('The id of the products with the distance');
        console.log(productDistance);

        const newArray: any[] = [];
        // set the products with he correct order in a new array
        for (let i = 0; i < productDistance.length; i++) {
            newArray[i] = this.getProductById(this.jsonData, productDistance[i].productId);
        }
        console.log('The new sorted array based on location');
        console.log(newArray);
        // set the value of the new array in the jsonData array
        this.jsonData = newArray;
    }

    getProductById(data: any[], id: number): any {
        // find the product with a certain id
        let returnValue = null;
        data.forEach(product => {
            if (product.id === id) {
                returnValue = product;
            } else if (returnValue !== null) {
                return returnValue;
            }
        });
        return returnValue;
    }

    compare(a, b): number {
        // compare two products by their distance
        const locationA = a.distance;
        const locationB = b.distance;

        let comparison = 0;
        if (locationA > locationB) {
            comparison = 1;
        } else if (locationA < locationB) {
            comparison = -1;
        }
        return comparison;
    }

    getCurrentAddress(): void {
        // get the current users address
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position1 => {
                this.position = {
                    latitude: position1.coords.latitude,
                    longitude: position1.coords.longitude,
                };
            });
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    }

    priceRange(values: { min, max }): void {
        if (values.min === '' && values.max !== '') {
            values.min = 0;
        }
        if (values.min === '' && values.max === '') {
            this.routeUtil.deleteParam('price');
        } else if (values.max === '') {
            this.routeUtil.addParam('price', values.min + '-');
        } else {
            this.routeUtil.addParam('price', values.min + '-' + values.max);

        }
    }

    filterCategory(values: any): void {
        if (values.target.checked) {
            this.selectedCategories.push(values.target.value);
        } else {
            this.selectedCategories.splice(this.selectedCategories.indexOf(values.target.value), 1);
        }
        if (this.selectedCategories.length > 0) {
            this.routeUtil.addParam('category', this.selectedCategories.join(','));
        } else {
            this.routeUtil.deleteParam('category');
        }
    }
}
