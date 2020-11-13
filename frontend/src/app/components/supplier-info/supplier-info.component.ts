import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {RouteUtil} from "../../utils/route.util";
import {SupplierInfoService} from "../../services/supplier-info.service";

@Component({
    selector: 'app-supplier-info',
    templateUrl: './supplier-info.component.html',
    styleUrls: ['./supplier-info.component.css']
})
export class SupplierInfoComponent implements OnInit {

    recentProducts: number[] = [1, 2, 3, 4]; // This should be of type Product (model) for now I add 4 items
    jsonSupplierData;
    recentProductMax = 4;

    constructor(
        private router: Router,
        private apiService: ApiService,
        private routeUtil: RouteUtil,
        private supplierInfoService: SupplierInfoService,
        private activatedRoute: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(
            res => {
                this.loadSupplierData(res.id);
                /*for (let i = 0; i < this.jsonSupplierData.length; i++) {
                    /!*this.message = JSON.parse(JSON.stringify(res[i].message));
                    this.category = JSON.parse(JSON.stringify(res[i].inquiryCategory.name));*!/
                }*/
            },
            err => {
                console.log('Can not find endPoint' + err);
            });
    }

    loadSupplierData(id: number): void {
        this.supplierInfoService.getSupplier(id).subscribe(
            res => {
                this.jsonSupplierData = res;
            },
            err => {
                console.log(err);
            }
        );
    }

    // Just a helper method to combine all adress detail into one String
    concatAddress(): string {
        return this.jsonSupplierData.addresses[0].street + ' ' + this.jsonSupplierData.addresses[0].number + ', ' +
            this.jsonSupplierData.addresses[0].postalCode + ' ' + this.jsonSupplierData.addresses[0].city;
    }

}
