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
    base64TrimmedURL: string;
    base64DefaultURL: string;
    windowOPen: boolean;
    generatedImage: string;

    constructor(private domSanitizer: DomSanitizer,
                private demoImage: DemoImage) {
    }

    ngOnInit(): void {
        if (this.supplier.profileImage != null) {
            this.profileImageName = this.supplier.name;
            this.getImage(atob(this.supplier.profileImage.picByte));
        } else {
            // Get the default image and put in src
            this.getImage(this.demoImage.imageBase64Url);
        }

    }

    // Just a helper method to combines all adress detail into one String
    concatAddress(): string {
        return this.supplier.addresses[0].street + ' ' + this.supplier.addresses[0].number + ', ' +
            this.supplier.addresses[0].postalCode + ' ' + this.supplier.addresses[0].city;
    }


    // TODO MAKE THIS A GENERAL CODE
    // METHODS FOR IMAGE
    // Finally sanitize generatedImageUrl to fit in the src of <img> tag
    sanatizeUrl(generatedImageUrl): SafeResourceUrl {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(generatedImageUrl);
    }

    /** Get Image from a Base64 Url */
    getImage(imageUrl: string): void {
        this.windowOPen = true;
        this.getBase64ImageFromURL(imageUrl).subscribe((base64Data: string) => {
            this.base64TrimmedURL = base64Data;
            this.createBlobImageFileAndShow();
        });
    }

    /* Method to fetch image from Url */
    getBase64ImageFromURL(url: string): Observable<string> {
        return Observable.create((observer: Observer<string>) => {
            // create an image object
            let img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = url;
            if (!img.complete) {
                // This will call another method that will create image from url
                img.onload = () => {
                    observer.next(this.getBase64Image(img));
                    observer.complete();
                };
                img.onerror = err => {
                    observer.error(err);
                };
            } else {
                observer.next(this.getBase64Image(img));
                observer.complete();
            }
        });
    }

    /* Method to create base64Data Url from fetched image */
    getBase64Image(img: HTMLImageElement): string {
        // We create a HTML canvas object that will create a 2d image
        let canvas: HTMLCanvasElement = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
        // This will draw image
        ctx.drawImage(img, 0, 0);
        // Convert the drawn image to Data URL
        let dataURL: string = canvas.toDataURL("image/png");
        this.base64DefaultURL = dataURL;
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

    /** Method that will create Blob and show in new window */
    createBlobImageFileAndShow(): void {
        this.dataURItoBlob(this.base64TrimmedURL).subscribe((blob: Blob) => {
            const imageBlob: Blob = blob;
            // console.log(this.generateName());
            const imageName: string = this.profileImageName/*this.generateName()*/;
            const imageFile: File = new File([imageBlob], imageName, {type: blob.type});
            this.generatedImage = window.URL.createObjectURL(imageFile);
            // on demo image not open window
            /*if (this.windowOPen) {
                window.open(this.generatedImage);
            }*/
        });
    }

    /* Method to convert Base64Data Url as Image Blob */
    dataURItoBlob(dataURI: string): Observable<Blob> {
        return Observable.create((observer: Observer<Blob>) => {
            const byteString: string = window.atob(dataURI);
            const arrayBuffer: ArrayBuffer = new ArrayBuffer(byteString.length);
            const int8Array: Uint8Array = new Uint8Array(arrayBuffer);
            for (let i = 0; i < byteString.length; i++) {
                int8Array[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([int8Array], {type: "image/jpeg"});
            observer.next(blob);
            observer.complete();
        });
    }

}
