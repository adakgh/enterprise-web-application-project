import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {RouteUtil} from '../../utils/route.util';
import {ProductService} from '../../services/product.service';
import {FormBuilder} from '@angular/forms';

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

    constructor(
        private router: Router,
        private apiService: ApiService,
        private routeUtil: RouteUtil,
        private productService: ProductService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder
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

    sortProducts(values: any): void {
        if (values.target.value !== '') {
            this.routeUtil.addParam('sort', values.target.value);
        } else {
            this.routeUtil.deleteParam('sort');
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
