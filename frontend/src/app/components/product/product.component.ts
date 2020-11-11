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

    jsonData: string[] = [];
    productList: any = {};

    constructor(
        private router: Router,
        private apiService: ApiService,
        private routeUtil: RouteUtil,
        private productService: ProductService
    ) {}

    ngOnInit(): void {
        this.productService.getAllProduct().subscribe(
            res => {
                // console.log(res);
            },
            err => {
                console.log(err);
            }
        );
    }

    findProductStartingWithLetterT(values: any): void {
        if (values.currentTarget.checked) {
            this.routeUtil.addParam('name', 'ko*');
        } else {
            this.routeUtil.deleteParam('name');
        }
    }

    sortOnName(values: any): void {
        if (values.currentTarget.checked) {
            this.routeUtil.addParam('sort', 'name');
        } else {
            this.routeUtil.deleteParam('sort');
        }
    }
}
