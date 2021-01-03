import {Component, Input, OnInit} from '@angular/core';
import {DemoImage} from '../../supplier-info/supplier-info-edit/default-image';
import {Router} from "@angular/router";

@Component({
    selector: 'app-supplier-item',
    templateUrl: './supplier-item.component.html',
    styleUrls: ['./supplier-item.component.css']
})
export class SupplierItemComponent implements OnInit {

    @Input() supplier;      // Hold the supplier data retrieved from the parent SupplierListComponent
    generatedImage: string; // The profile image src of the supplier

    constructor(public demoImage: DemoImage, private router: Router) {
    }

    // On init set the src of the profile image of the supplier if there is a image available
    ngOnInit(): void {
        if (this.supplier.profileImage != null) {
            this.generatedImage = atob(this.supplier.profileImage.picByte);
        } else {
            // Get the default image and put in src
            this.generatedImage = (this.demoImage.imageBase64Url);
        }
    }

    // Just a helper method to combines all loose address details into one String
    concatAddress(): string {
        return this.supplier.addresses[0].street + ' ' + this.supplier.addresses[0].number + ', ' +
            this.supplier.addresses[0].postalCode + ' ' + this.supplier.addresses[0].city;
    }

    // Link click event that refers user to the page with all product the current supplier is offering
    allProducts(): void {
        this.router.navigate(['myproducts'], {queryParams: {id: this.supplier.id}});
    }

}
