import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {RouteUtil} from '../../utils/route.util';
import {ProductService} from '../../services/product.service';
import {DemoImage} from '../supplier-info/supplier-info-edit/default-image';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

    jsonData: any[] = [];
    price;
    type;

    constructor(
        private router: Router,
        private apiService: ApiService,
        private routeUtil: RouteUtil,
        private productService: ProductService,
        public demoImage: DemoImage
    ) {}

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
}
