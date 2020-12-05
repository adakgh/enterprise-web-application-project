import {Component, OnInit} from '@angular/core';
import {SupplierInfoService} from '../../services/supplier-info.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {RouteUtil} from '../../utils/route.util';

@Component({
    selector: 'app-suppliers-list',
    templateUrl: './suppliers-list.component.html',
    styleUrls: ['./suppliers-list.component.css']
})
export class SuppliersListComponent implements OnInit {

    jsonSupplierData;

    constructor(
        private router: Router,
        private apiService: ApiService,
        private routeUtil: RouteUtil,
        private supplierInfoService: SupplierInfoService,
        private activatedRoute: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.supplierInfoService.getAllSuppliers().subscribe(
            res => {
                this.jsonSupplierData = res;
            },
            err => {
                console.log(err);
            }
        );
    }

}
