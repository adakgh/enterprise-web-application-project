import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {RouteUtil} from "../../utils/route.util";
import {ProductService} from "../../services/product.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    jsonData = [];

    isLoggedIn = false;
    hasAdminRole = false;
    hasUserRole = false;
    userId = '';

    constructor(private router: Router,
                private apiService: ApiService,
                private routeUtil: RouteUtil,
                private productService: ProductService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        const sessionInfo = sessionStorage.getItem('currentUser');
        this.isLoggedIn = sessionInfo != null;
        if (sessionInfo) {
            this.hasAdminRole = JSON.parse(sessionInfo).role === 'ROLE_ADMIN';
            this.hasUserRole = JSON.parse(sessionInfo).role === 'ROLE_USER';
            this.userId = JSON.parse(sessionInfo).userId;
        }

        this.productService.getRecentProducts().subscribe(
            res => {
                const LIMIT_PRODUCTS = 4;

                // console.log(res); all products sorted on newest to oldest

                // Limit the shown product to 4 by making de jsonData smaller
                let productsLength = res.length;
                if (productsLength > LIMIT_PRODUCTS) {
                    productsLength = LIMIT_PRODUCTS;
                }
                for (let i = 0; i < productsLength; i++) {
                    this.jsonData.push(res[i]);
                }
                // console.log(this.jsonData); all products sorted on newest to oldest but limited to 4
            },
            err => {
                console.log(err);
            }
        );

    }
}
