import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-supplier-item',
    templateUrl: './supplier-item.component.html',
    styleUrls: ['./supplier-item.component.css']
})
export class SupplierItemComponent implements OnInit {

    @Input() supplier;

    constructor() {
    }

    ngOnInit(): void {
    }

    // Just a helper method to combines all adress detail into one String
    concatAddress(): string {
        return this.supplier.addresses[0].street + ' ' + this.supplier.addresses[0].number + ', ' +
            this.supplier.addresses[0].postalCode + ' ' + this.supplier.addresses[0].city;
    }
}
