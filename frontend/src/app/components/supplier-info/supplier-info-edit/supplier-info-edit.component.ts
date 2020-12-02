import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {Supplier} from '../../../models/supplier';
import {SupplierInfoService} from '../../../services/supplier-info.service';
import {CurrentUserService} from '../../../services/current-user.service';
import {NgForm} from '@angular/forms';
import {RouteUtil} from '../../../utils/route.util';
import {Observable, Observer} from 'rxjs';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {DemoImage} from './default-image';

@Component({
    selector: 'app-supplier-info-edit',
    templateUrl: './supplier-info-edit.component.html',
    styleUrls: ['./supplier-info-edit.component.css']
})
export class SupplierInfoEditComponent implements OnInit {

    @ViewChild('f', {static: false}) signupForm: NgForm;
    supplierId;                             // the current supplier id
    supplier: Supplier = new Supplier();    // object/model where we store all supplier info
    submitted = false;                      // Tracks if the update form is submitted or not
    selectedFile: File;                     // The select Files
    selectedFileUrl;                        // The select File's Base64 Url

    profileImageName;
    base64TrimmedURL: string;
    base64DefaultURL: string;
    windowOPen: boolean;
    generatedImage: string;

    constructor(
        private apiService: ApiService,
        private router: Router,
        private supplierInfoService: SupplierInfoService,
        private activatedRoute: ActivatedRoute,
        private currentUserService: CurrentUserService,
        private routeUtil: RouteUtil,
        private httpClient: HttpClient,
        private domSanitizer: DomSanitizer,
        private demoImage: DemoImage
    ) {
    }

    // Look at the query and based on that show the data of the supplier
    ngOnInit(): void {
        // Get the default image and put in src
        this.getImage(this.demoImage.imageBase64Url);
        this.activatedRoute.queryParams.subscribe(
            res => {
                // If there is no query given return user to homepage or if the supplier id in the query
                // is not equal to the logged in supplier
                if (res.id <= 0 || res.id == null || this.currentUserService.getSupplierId() != res.id) {
                    this.router.navigate(['/']);
                    return;
                }
                this.loadSupplierData(res.id);
            },
            err => {
                console.log('Can not find endPoint' + err);
            });
    }

    // Load all data of the supplier with the given id
    loadSupplierData(id: number): void {
        this.supplierInfoService.getSupplier(id).subscribe(
            res => {
                this.supplierId = res.id;
                this.supplier = new Supplier();
                // Transform the retrieved data into the supplier model
                this.supplier.companyName = res.companyName != null ? res.companyName : '';
                this.supplier.contactPerson = res.contactPerson != null ? res.contactPerson : '';
                this.supplier.contactEmail = res.contactEmail != null ? res.contactEmail : '';
                this.supplier.website = res.website != null ? res.website : '';
                this.supplier.phoneNumber = res.phoneNumber != null ? res.phoneNumber : '';
                this.supplier.shortDescription = res.shortDescription != null ? res.shortDescription : '';
                this.supplier.description = res.description != null ? res.description : '';

                // Get the adress value and put it in the supplier model
                if (res.addresses.length <= 0) {
                    this.supplier.addresses = [{
                        id: '',
                        street: '',
                        number: '',
                        postalCode: '',
                        city: '',
                        country: '',
                    }];
                } else {
                    this.supplier.addresses = [{
                        id: res.addresses[0].id,
                        street: res.addresses[0].street,
                        number: res.addresses[0].number,
                        postalCode: res.addresses[0].postalCode,
                        city: res.addresses[0].city,
                        country: res.addresses[0].country,
                    }];
                }

                if (res.profileImage != null) {
                    this.profileImageName = res.name;
                    this.getImage(atob(res.profileImage.picByte));
                }

            },
            err => {
                console.log(err);
            }
        );
    }

    // Gets triggered when user(supplier) is done editing and click the button to update
    onUpdateSupplier(): void {

        if (this.selectedFile != null) {
            // Create a object with the supplier data and the selected image data and send that
            const image = {
                supplier: this.supplier,
                name: this.selectedFile.name,
                type: this.selectedFile.type,
                url: this.selectedFileUrl
            };

            this.supplierInfoService.updateSupplier(image).subscribe(
                res => {
                    this.submitted = true;
                    console.log('Succesfully updated supplier with profileImage');
                    console.log(this.signupForm);
                    console.log(this.supplier);
                    // Redirect to the supplier info page
                    this.router.navigate(['../'], {
                        relativeTo: this.activatedRoute,
                        queryParams: {id: this.supplierId}
                    });
                },
                err => {
                    console.log(err);
                }
            );

        } else { // If no Image is selected only send the supplier data
            this.supplierInfoService.updateSupplier({supplier: this.supplier}).subscribe(
                res => {
                    this.submitted = true;
                    console.log('Succesfully updated supplier.');
                    console.log(this.signupForm);
                    console.log(this.supplier);
                    this.router.navigate(['../'], {
                        relativeTo: this.activatedRoute,
                        queryParams: {id: this.supplierId}
                    });
                },
                err => {
                    console.log(err);
                }
            );
        }
    }

    // Gets triggered when user chooses a new profile image file
    onFileChange(event): void {
        this.selectedFile = event.target.files[0];
        console.log(this.selectedFile);

        // Read the contents of the specified Blob or File, in this case the selectedFile
        // The result attribute contains the data as a data: URL representing the file's data as a base64 encoded string
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onload = () => {
            this.selectedFileUrl = reader.result;
            this.getImage(this.selectedFileUrl);
        };
    }


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
            const img = new Image();
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
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        // This will draw image
        ctx.drawImage(img, 0, 0);
        // Convert the drawn image to Data URL
        const dataURL: string = canvas.toDataURL('image/png');
        this.base64DefaultURL = dataURL;
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
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
            const blob = new Blob([int8Array], {type: 'image/jpeg'});
            observer.next(blob);
            observer.complete();
        });
    }

    /** Method to Generate a Random Name for the Image */
    generateName(): string {
        const date: number = new Date().valueOf();
        let text = '';
        const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            text += possibleText.charAt(
                Math.floor(Math.random() * possibleText.length)
            );
        }
        // Replace extension according to your media type like this
        return date + '.' + text + '.jpeg';
    }

    /*getDefaultImage(imageUrl: string): void {
        this.windowOPen = false;
        this.getBase64ImageFromURL(imageUrl).subscribe((base64Data: string) => {
            this.base64TrimmedURL = base64Data;
            this.createBlobImageFileAndShow();
        });
    }*/

    // TEMP NOT USING
    convertDataUrlToBlob(dataUrl): Blob {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new Blob([u8arr], {type: mime});
    }

    @HostListener('window:beforeunload')
    canDeactivate(): boolean {
        // If there is something changed WARN the user
        if (this.signupForm.dirty) {
            if (!this.submitted) {
                return confirm('Wijzigingen die u heeft gemaakt zullen niet worden opgeslagen, weet u zeker dat u de pagina wilt verlaten?');
            }
        }
        return true;
    }

}
