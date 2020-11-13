import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {Supplier} from '../../../models/supplier';

@Component({
    selector: 'app-supplier-info-edit',
    templateUrl: './supplier-info-edit.component.html',
    styleUrls: ['./supplier-info-edit.component.css']
})
export class SupplierInfoEditComponent implements OnInit {

    private errorMessage: string;
    jsonData: any;
    productList: any = {};
    productData: any = {};
    selectedFile = null;

    supplier: Supplier = new Supplier();
    supplierAddress;

    constructor(
        private apiService: ApiService,
        private router: Router,
        private http: HttpClient
    ) {
    }

    ngOnInit(): void {
        this.supplierAddress = this.concatAddress();
    }

    // Gets triggered when user(supplier) is done editing and click the button to update
    onUpdateSupplier() {
        console.log('Jo Update every shjit');
        console.log(this.supplier);
    }

    // Just a helper method to combine all adress detail into one String
    concatAddress(): string {
        return this.supplier.adres.street + ' ' + this.supplier.adres.number + ', ' +
            this.supplier.adres.postalCode + ' ' + this.supplier.adres.city;
    }

}
