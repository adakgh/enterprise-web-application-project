import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {Supplier} from '../../../models/supplier';
import {SupplierInfoService} from '../../../services/supplier-info.service';
import {CurrentUserService} from '../../../services/current-user.service';
import {NgForm} from '@angular/forms';
import {RouteUtil} from '../../../utils/route.util';
import {Observable, Observer} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {DemoImage} from "./default-image";

@Component({
    selector: 'app-supplier-info-edit',
    templateUrl: './supplier-info-edit.component.html',
    styleUrls: ['./supplier-info-edit.component.css']
})
export class SupplierInfoEditComponent implements OnInit {

    @ViewChild('f', {static: false}) signupForm: NgForm;
    supplierId;
    supplier: Supplier;
    submitted = false;
    selectedFile: File;
    profileImage;

    /*    // Test Attributes
        defaultQuestion = 'teacher';
        answer = '';
        genders = ['male', 'female'];
        user = {
            username: '',
            email: '',
            secretQuestion: '',
            answer: '',
            gender: ''
        };*/

    base64TrimmedURL: string;
    base64DefaultURL: string;
    generatedImage: string;
    windowOPen: boolean;

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
        this.getImageWithoutWindowOpen(this.demoImage.imageBase64Url);
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

            },
            err => {
                console.log(err);
            }
        );
    }

    // Gets triggered when user(supplier) is done editing and click the button to update
    onUpdateSupplier(): void {
        const uploadImageData = new FormData();
        uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onload = () => {
            console.log('READER');
            if (typeof reader.result === 'string') {
                console.log(JSON.parse(JSON.stringify(reader.result)));
            }

            const image = {
                url: reader.result,
                name: this.selectedFile.name
            };

            this.supplierInfoService.updateSupplier(image).subscribe(
                res => {
                    this.submitted = true;
                    console.log('Succesfully updated shizzle.');
                    console.log(this.signupForm);
                    // console.log(this.supplier);
                    // this.router.navigate(['../'], {relativeTo: this.activatedRoute, queryParams: {id: this.supplierId}});
                },
                err => {
                    console.log(err);
                }
            );

        };

        /*const image = {
            lastModified: this.selectedFile.lastModified,
            name: this.selectedFile.name,
            arrayBuffer: this.selectedFile.arrayBuffer(),
            size: this.selectedFile.size,
            stream: this.selectedFile.stream(),
            text: this.selectedFile.text(),
            type: this.selectedFile.type
        };*/

        const myPostBody = {supplier: this.supplier, image: uploadImageData};
        // Make a call to the Spring Boot Application to save the image
        /*        this.supplierInfoService.updateSupplier(JSON.stringify(myPostBody))
                    .subscribe((response) => {
                            /!*if (response.status === 200) {
                                this.message = 'Image uploaded successfully';
                            } else {
                                this.message = 'Image not uploaded successfully';
                            }*!/
                            this.submitted = true;
                            console.log('Succesfully updated shizzle.');
                            console.log(this.signupForm);
                        }
                    );*/

    }

    // Gets triggered when user chooses a new profile image
    onFileChange(event): void {
        this.selectedFile = event.target.files[0];
        console.log(this.selectedFile);
    }


    getImageClicked(): void {
        this.supplierInfoService.getImage(1).subscribe(
            res => {
                console.log('Image received:');
                console.log(res);
                console.log('URL:');
                console.log(atob(res.picByte));

                /*const objectURL = URL.createObjectURL(this.convertDataUrlToBlob(atob(res.picByte)));
                    // this.profileImage = objectURL;
                const file = new File([this.convertDataUrlToBlob(atob(res.picByte))], res.name, {type: res.type});*/
                this.getImage(atob(res.picByte));

                console.log(this.sanatizeUrl(this.generatedImage));

                // console.log(this.supplier);
                // this.router.navigate(['../'], {relativeTo: this.activatedRoute, queryParams: {id: this.supplierId}});
            },
            err => {
                console.log(err);
            }
        );
    }

    sanatizeUrl(generatedImageUrl): SafeResourceUrl {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(generatedImageUrl);
    }

    getImage(imageUrl: string) {
        this.windowOPen = true;
        this.getBase64ImageFromURL(imageUrl).subscribe((base64Data: string) => {
            this.base64TrimmedURL = base64Data;
            console.log(this.base64DefaultURL);
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
        var canvas: HTMLCanvasElement = document.createElement("canvas");
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

    /**Method that will create Blob and show in new window */
    createBlobImageFileAndShow(): void {
        this.dataURItoBlob(this.base64TrimmedURL).subscribe((blob: Blob) => {
            const imageBlob: Blob = blob;
            const imageName: string = this.generateName();
            const imageFile: File = new File([imageBlob], imageName, {
                type: 'image/jpeg'
            });
            this.generatedImage = window.URL.createObjectURL(imageFile);
            // on demo image not open window
            /*if (this.windowOPen) {
                window.open(this.generatedImage);
            }*/
            console.log("generated image");
            console.log(this.generatedImage);
            this.profileImage = this.sanatizeUrl(this.generatedImage);
        });
    }

    /** Method to Generate a Name for the Image */
    generateName(): string {
        const date: number = new Date().valueOf();
        let text: string = "";
        const possibleText: string =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i++) {
            text += possibleText.charAt(
                Math.floor(Math.random() * possibleText.length)
            );
        }
        // Replace extension according to your media type like this
        return date + "." + text + ".jpeg";
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

    getImageWithoutWindowOpen(imageUrl: string) {
        this.windowOPen = false;
        this.getBase64ImageFromURL(imageUrl).subscribe((base64Data: string) => {
            this.base64TrimmedURL = base64Data;
            this.createBlobImageFileAndShow();
        });
    }

    // TEMP NOT WORKING
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

    // CHUNK TEST METHODS

    /*onSubmit() {
        // this.submitted = true;
        /!*this.user.username = this.signupForm.value.userData.username;
        this.user.email = this.signupForm.value.userData.email;
        this.user.secretQuestion = this.signupForm.value.secret;
        this.user.answer = this.signupForm.value.questionAnswer;
        this.user.gender = this.signupForm.value.gender;

        this.signupForm.reset();*!/
    }
*/

    // onSubmit(form: NgForm) {
    //   console.log(form);
    // }

    /*suggestUserName() {
        const suggestedName = 'Superuser';
        // this.signupForm.setValue({
        //   userData: {
        //     username: suggestedName,
        //     email: ''
        //   },
        //   secret: 'pet',
        //   questionAnswer: '',
        //   gender: 'male'
        // });
        this.signupForm.form.patchValue({
            userData: {
                username: suggestedName
            }
        });
    }*/
}
