import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Observable, Observer} from "rxjs";
import {DemoImage} from "../../supplier-info/supplier-info-edit/default-image";

@Component({
    selector: 'app-supplier-item',
    templateUrl: './supplier-item.component.html',
    styleUrls: ['./supplier-item.component.css']
})
export class SupplierItemComponent implements OnInit {

    @Input() supplier;
    profileImageName;
    generatedImage: string;

    constructor(public demoImage: DemoImage) {
    }

    ngOnInit(): void {
        if (this.supplier.profileImage != null) {
            this.profileImageName = this.supplier.name;
            this.generatedImage = atob(this.supplier.profileImage.picByte);
        } else {
            // Get the default image and put in src
            this.generatedImage = (this.demoImage.imageBase64Url);
        }

    }

    // Just a helper method to combines all adress detail into one String
    concatAddress(): string {
        return this.supplier.addresses[0].street + ' ' + this.supplier.addresses[0].number + ', ' +
            this.supplier.addresses[0].postalCode + ' ' + this.supplier.addresses[0].city;
    }


}
