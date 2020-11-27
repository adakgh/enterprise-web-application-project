import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MyProductsService} from '../../services/my-products.service';
import {RouteUtil} from '../../utils/route.util';
import {ProductService} from '../../services/product.service';

@Component({
    selector: 'app-myproducts',
    templateUrl: './myproducts.component.html',
    styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit {

    jsonData: any[] = [];
    categoryMap: any[] = [];
    selectedCategories: any = [];

    constructor(
        private router: Router,
        private apiService: ApiService,
        private routeUtil: RouteUtil,
        private productService: ProductService,
        private myProductsService: MyProductsService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.routeUtil.clearParams();
        this.activatedRoute.queryParamMap.subscribe(
            res => {
                this.loadData();
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
    }

    loadData(): void {
        this.myProductsService.getAllMyProducts().subscribe(
            res => {
                this.jsonData = res;
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

    filterCategory(values: any): void {
        if (values.target.checked) {
            this.selectedCategories.push(values.target.value);
        } else {
            console.log('delete');
            this.selectedCategories.splice(this.selectedCategories.indexOf(values.target.value), 1);
        }
        console.log(this.selectedCategories);
        if (this.selectedCategories.length > 0) {
            this.routeUtil.addParam('category', this.selectedCategories.join(','));
        } else {
            this.routeUtil.deleteParam('category');
        }
    }
}
