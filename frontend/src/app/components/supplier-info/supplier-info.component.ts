import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {RouteUtil} from '../../utils/route.util';
import {SupplierInfoService} from '../../services/supplier-info.service';

@Component({
    selector: 'app-supplier-info',
    templateUrl: './supplier-info.component.html',
    styleUrls: ['./supplier-info.component.css']
})
export class SupplierInfoComponent implements OnInit {

    jsonSupplierData;

    constructor(
        private router: Router,
        private apiService: ApiService,
        private routeUtil: RouteUtil,
        private supplierInfoService: SupplierInfoService,
        private activatedRoute: ActivatedRoute,
    ) {
    }

    // Subscribe to the query paramaters in the URL
    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(
            res => {
                this.loadSupplierData(res.id);
            },
            err => {
                console.log('Can not find endPoint' + err);
            });
    }

    // Get all information about the supplier with the given id in the query
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

    // Just a helper method to combines all adress detail into one String
    concatAddress(): string {
        return this.jsonSupplierData.addresses[0].street + ' ' + this.jsonSupplierData.addresses[0].number + ', ' +
            this.jsonSupplierData.addresses[0].postalCode + ' ' + this.jsonSupplierData.addresses[0].city;
    }

}
