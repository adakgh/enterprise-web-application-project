import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {Supplier} from '../../../models/supplier';
import {SupplierInfoService} from "../../../services/supplier-info.service";

@Component({
    selector: 'app-supplier-info-edit',
    templateUrl: './supplier-info-edit.component.html',
    styleUrls: ['./supplier-info-edit.component.css']
})
export class SupplierInfoEditComponent implements OnInit {

    supplier: Supplier;

    constructor(
        private apiService: ApiService,
        private router: Router,
        private http: HttpClient,
        private supplierInfoService: SupplierInfoService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(
            res => {
                console.log("Find shit of supplier with id: " + res.id);
                this.loadSupplierData(res.id);
            },
            err => {
                console.log('Can not find endPoint' + err);
            });
    }

    loadSupplierData(id: number): void {
        this.supplierInfoService.getSupplier(id).subscribe(
            res => {
                this.supplier = new Supplier();
                // Transform the retrieved data into the supplier model
                this.supplier.companyName = res.companyName;
                this.supplier.contactPerson = res.contactPerson;
                this.supplier.contactEmail = res.contactEmail;
                this.supplier.website = res.website;
                this.supplier.phoneNumber = res.phoneNumber;
                this.supplier.shortDescription = res.shortDescription;
                this.supplier.description = res.description;
            },
            err => {
                console.log(err);
            }
        );
    }

    // Gets triggered when user(supplier) is done editing and click the button to update
    // tslint:disable-next-line:typedef
    onUpdateSupplier() {
        console.log('Jo Update every shjit');
        console.log(this.supplier);

        this.supplierInfoService.updateSupplier(this.supplier).subscribe(
            res => {
                console.log('Succesfully updated shizzle.');
            },
            err => {
                console.log(err);
            }
        );
    }

    // Just a helper method to combine all adress detail into one String
    concatAddress(): string {
        return this.supplier.adres.street + ' ' + this.supplier.adres.number + ', ' +
            this.supplier.adres.postalCode + ' ' + this.supplier.adres.city;
    }

}
