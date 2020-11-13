import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {RouteUtil} from "../../utils/route.util";
import {ProductService} from "../../services/product.service";
import {InquiryService} from "../../services/inquiry.service";
import {SupplierInfoService} from "../../services/supplier-info.service";

@Component({
    selector: 'app-supplier-info',
    templateUrl: './supplier-info.component.html',
    styleUrls: ['./supplier-info.component.css']
})
export class SupplierInfoComponent implements OnInit {

    recentProducts: number[] = [1, 2, 3, 4]; // This should be of type Product (model) for now I add 4 items
    jsonSupplierData: any[] = [];

    constructor(
        private router: Router,
        private apiService: ApiService,
        private routeUtil: RouteUtil,
        private supplierInfoService: SupplierInfoService,
        private activatedRoute: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.queryParamMap.subscribe(
            res => {
                console.log(res);
                this.loadSupplierData();
                // this.jsonSupplierData = res;

                for (let i = 0; i < this.jsonSupplierData.length; i++) {
                    /*this.message = JSON.parse(JSON.stringify(res[i].message));
                    this.category = JSON.parse(JSON.stringify(res[i].inquiryCategory.name));*/
                }
            },
            err => {
                console.log('Can not find endPoint' + err);
            });
    }

    loadSupplierData(): void {
        this.supplierInfoService.getSupplier().subscribe(
            res => {
                this.jsonSupplierData = res;
            },
            err => {
                console.log(err);
            }
        );
    }

}
