import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
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

    constructor(
        private router: Router,
        private apiService: ApiService,
        private routeUtil: RouteUtil,
        private productService: ProductService
    ) {}

    ngOnInit(): void {
        this.productService.getAllProduct().subscribe(
            res => {
                this.jsonData = res;
                console.log(res);
            },
            err => {
                console.log(err);
            }
        );
    }

    searchValue(values: any): void {
        console.log(values.target.value);
        if (values.target.value !== '') {
            this.routeUtil.addParam('name', values.target.value);
        } else {
            this.routeUtil.deleteParam('name');
        }
    }

    filterCategory(values: any): void {
        if (values.currentTarget.checked) {
            this.routeUtil.addParam('category', values.target.value);
        } else {
            this.routeUtil.deleteParam('category');
        }
    }
}
