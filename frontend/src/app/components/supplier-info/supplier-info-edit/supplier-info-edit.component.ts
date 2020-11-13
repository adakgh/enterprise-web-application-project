import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {Supplier} from '../../../models/supplier';
import {SupplierInfoService} from '../../../services/supplier-info.service';

@Component({
    selector: 'app-supplier-info-edit',
    templateUrl: './supplier-info-edit.component.html',
    styleUrls: ['./supplier-info-edit.component.css']
})
export class SupplierInfoEditComponent implements OnInit {

    supplierId;
    supplier: Supplier;

    constructor(
        private apiService: ApiService,
        private router: Router,
        private http: HttpClient,
        private supplierInfoService: SupplierInfoService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    // Look at the query and based on that show the data of the supplier
    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(
            res => {
                this.loadSupplierData(res.id);
            },
            err => {
                console.log('Can not find endPoint' + err);
            });
    }

    // Load all data of the supplier with the given id
    loadSupplierData(id: number): void {
        this.supplierInfoService.getSupplier(id).subscribe(
            res => {
                this.supplierId = res.id;
                this.supplier = new Supplier();
                // Transform the retrieved data into the supplier model
                this.supplier.companyName = res.companyName;
                this.supplier.contactPerson = res.contactPerson;
                this.supplier.contactEmail = res.contactEmail;
                this.supplier.website = res.website;
                this.supplier.phoneNumber = res.phoneNumber;
                this.supplier.shortDescription = res.shortDescription;
                this.supplier.description = res.description;

                // Get the adress value and put it in the supplier model
                this.supplier.addresses = [{
                    id: res.addresses[0].id,
                    street: res.addresses[0].street,
                    number: res.addresses[0].number,
                    postalCode: res.addresses[0].postalCode,
                    city: res.addresses[0].city,
                    country: res.addresses[0].country,
                }];
            },
            err => {
                console.log(err);
            }
        );
    }

    // Gets triggered when user(supplier) is done editing and click the button to update
    onUpdateSupplier(): void {
        this.supplierInfoService.updateSupplier(this.supplier).subscribe(
            res => {
                console.log('Succesfully updated shizzle.');
                this.router.navigate(['../'], {relativeTo: this.activatedRoute, queryParams: {id: this.supplierId}});
            },
            err => {
                console.log(err);
            }
        );
    }
}
