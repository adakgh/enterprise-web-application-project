import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-recent-product',
    templateUrl: './recent-product.component.html',
    styleUrls: ['./recent-product.component.css']
})
export class RecentProductComponent implements OnInit {

    @Input() product;

    constructor() {
    }

    ngOnInit(): void {
    }

}
