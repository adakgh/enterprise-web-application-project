import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {RouteUtil} from '../../utils/route.util';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

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
                this.jsonData = res[0];
                console.log(this.jsonData);
            },
            err => {
                console.log(err);
            }
        );
    }

}
