import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {RouteUtil} from '../../utils/route.util';
import {SupplierInfoService} from '../../services/supplier-info.service';
import {CurrentUserService} from '../../services/current-user.service';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Observable, Observer} from "rxjs";
import {DemoImage} from "./supplier-info-edit/default-image";
import {CurrentUserService} from '../../services/current-user.service';

@Component({
    selector: 'app-supplier-info',
    templateUrl: './supplier-info.component.html',
    styleUrls: ['./supplier-info.component.css']
})
export class SupplierInfoComponent implements OnInit {

    jsonSupplierData;
    jsonLimitedProductsData: any[] = [];

    profileImageName;
    base64TrimmedURL: string;
    base64DefaultURL: string;
    windowOPen: boolean;
    generatedImage: string;

    constructor(
        private router: Router,
        private apiService: ApiService,
        private routeUtil: RouteUtil,
        private supplierInfoService: SupplierInfoService,
        private activatedRoute: ActivatedRoute,
        public currentUserService: CurrentUserService,
        private domSanitizer: DomSanitizer,
        private demoImage: DemoImage
    ) {
    }

    ngOnInit(): void {
        // Subscribe to the query paramaters in the URL
        this.activatedRoute.queryParams.subscribe(
            res => {
                // If there is no query given return user to homepage
                if (res.id <= 0 || res.id == null) {
                    this.router.navigate(['/']);
                    return;
                }
                this.loadSupplierData(res.id);
            },
            err => {
                console.log('Can not find endPoint' + err);
            });
    }

    // Get all information about the supplier with the given id in the query
    loadSupplierData(id: number): void {
        this.supplierInfoService.getSupplier(id).subscribe(
            res => {
                this.jsonSupplierData = res;

                // Limit the shown product to 4 by making de jsonData smaller
                let productsLength = res.products.length;
                if (productsLength > 4) {
                    productsLength = 4;
                }
                for (let i = 0; i < productsLength; i++) {
                    this.jsonLimitedProductsData.push(res.products[i]);
                }
                console.log(this.jsonLimitedProductsData);



                if (res.profileImage != null) {
                    this.profileImageName = res.name;
                    this.getImage(atob(res.profileImage.picByte));
                } else {
                    // Get the default image and put in src
                    this.getImage(this.demoImage.imageBase64Url);
                }
            },
            err => {
                console.log(err);
            }
        );
    }

    // Just a helper method to combines all adress detail into one String
    concatAddress(): string {
        return this.jsonSupplierData.addresses[0].street + ' ' + this.jsonSupplierData.addresses[0].number + ', ' +
            this.jsonSupplierData.addresses[0].postalCode + ' ' + this.jsonSupplierData.addresses[0].city;
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
