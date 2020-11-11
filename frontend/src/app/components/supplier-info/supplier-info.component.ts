import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-supplier-info',
    templateUrl: './supplier-info.component.html',
    styleUrls: ['./supplier-info.component.css']
})
export class SupplierInfoComponent implements OnInit {

    recentProducts: number[] = [1, 2, 3, 4]; // This should be of type Product (model) for now I add 4 items

    constructor() {
    }

    ngOnInit(): void {
    }

}
