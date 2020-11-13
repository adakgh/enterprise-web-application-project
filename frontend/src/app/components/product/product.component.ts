import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {RouteUtil} from '../../utils/route.util';
import {ProductService} from '../../services/product.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    jsonData: any[] = [];
    categoryMap: any[] = [];
    selectedCategories: any = [];

    constructor(
        private router: Router,
        private apiService: ApiService,
        private routeUtil: RouteUtil,
        private productService: ProductService,
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
        this.productService.getAllProduct().subscribe(
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
