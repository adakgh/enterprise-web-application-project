import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-recent-products',
    templateUrl: './recent-products.component.html',
    styleUrls: ['./recent-products.component.css']
})
export class RecentProductsComponent implements OnInit {

    @Input() product = {
        addedDate: '',
        customData: null,
        description: '',
        id: 1,
        name: '',
        price: 4.95,
        price2: null,
        productCategory: null,
        productImage: null,
        quantity: 50,
        quantity2: null,
        unit: '',
    };

    constructor() {
    }

    ngOnInit(): void {
    }

}
