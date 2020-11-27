import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MyProductsService} from '../../services/my-products.service';
import {RouteUtil} from '../../utils/route.util';

@Component({
    selector: 'app-myproducts',
    templateUrl: './myproducts.component.html',
    styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit {
    jsonData: any[] = [];

    constructor(
        private apiService: ApiService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private routeUtil: RouteUtil,
        private myProductsService: MyProductsService
    ) {
    }

    ngOnInit(): void {
        this.routeUtil.clearParams();
        this.activatedRoute.queryParamMap.subscribe(
            res => {
                this.loadData();
            }
        );
    }

    loadData(): void {
        this.myProductsService.getAllMyProducts().subscribe(
            res => {
                this.jsonData = res;
                console.log(res);
            },
            err => {
                console.log(err);
            }
        );
    }

}
