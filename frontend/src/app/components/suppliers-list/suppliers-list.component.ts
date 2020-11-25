import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-suppliers-list',
    templateUrl: './suppliers-list.component.html',
    styleUrls: ['./suppliers-list.component.css']
})
export class SuppliersListComponent implements OnInit {

    varFor = [1, 5, 3, 4];

    constructor() {
    }

    ngOnInit(): void {
    }

}
