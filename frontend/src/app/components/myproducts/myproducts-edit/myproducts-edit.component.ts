import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {Product} from '../../../models/product';
import {DemoImage} from "../../supplier-info/supplier-info-edit/default-image";

@Component({
    selector: 'app-myproducts-edit',
    templateUrl: './myproducts-edit.component.html',
    styleUrls: ['./myproducts-edit.component.css']
})
export class MyproductsEditComponent implements OnInit {
    productId;
    productData: Product = new Product();
    jsonProductData: any[];
    categoryMap: any[];
    selectedFile: File = null;
    selectedFileUrl;
    supplierId: number;

    generatedImage;

    constructor(
        private apiService: ApiService,
        private router: Router,
        private productService: ProductService,
        private activatedRoute: ActivatedRoute,
        public demoImage: DemoImage
    ) {
    }

    ngOnInit(): void {
        this.demoImage.getImage(this.demoImage.productBase64Url);
        this.activatedRoute.queryParams.subscribe(
            res => {
                if (res.id <= 0 || res.id == null) {
                }
                this.loadProduct(res.id);
            },
            err => {
                console.log('Can not find endPoint' + err);
            });

        this.productService.getAllCategories().subscribe(
            res => this.categoryMap = res
        );
    }

    loadProduct(id: number): void {
        this.productService.getOneProduct(id).subscribe(
            res => {
                this.jsonProductData = res;
                console.log(res);
                this.productId = res.id;
                this.productData.name = res.name != null ? res.name : '';
                this.productData.price = res.price != null ? res.price : '';
                this.productData.quantity2 = res.quantity2 != null ? res.quantity2 : '';
                this.productData.description = res.description != null ? res.description : '';
                this.supplierId = res.customData.supplierId;

                if (res.productImage != null) {
                    // this.generatedImage = atob(res.productImage.picByte);
                    this.demoImage.getImage(atob(res.productImage.picByte));
                } /*else {
                    // Get the default image and put in src
                    // this.generatedImage = (this.demoImage.productBase64Url);
                }*/
            },
            err => {
                console.log(err);
            }
        );
    }

    updateProduct(): void {
        console.log(this.productData);
        this.productService.updateProduct(this.productId, this.productData).subscribe(
            resp => {
            },
            error => {
                console.log(error);
            }
        );


        if (this.selectedFile != null) {
            // Create a object with the supplier data and the selected image data and send that
            this.productData.imageName = this.selectedFile.name;
            this.productData.type = this.selectedFile.type;
            this.productData.url = this.selectedFileUrl;

            console.log(this.productData);

            this.productService.updateProduct(this.productId, this.productData).subscribe(
                resp => {
                    // this.reloadProductPage();
                    console.log('Succesfully updated c. with another Image');
                    console.log(this.productData);
                },
                error => {
                    console.log(error);
                }
            );

        } else { // If no Image is selected only send the supplier data
            this.productService.updateProduct(this.productId, this.productData).subscribe(
                res => {
                    console.log('Succesfully updated product.');
                    /*this.router.navigate(['../'], {
                        relativeTo: this.activatedRoute,
                        queryParams: {id: this.supplierId}
                    });*/
                },
                err => {
                    console.log(err);
                }
            );
        }
    }

    onFileSelected(event): void {
        this.selectedFile = event.target.files[0];
        console.log(this.selectedFile);

        // Read the contents of the specified Blob or File, in this case the selectedFile
        // The result attribute contains the data as a data: URL representing the file's data as a base64 encoded string
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onload = () => {
            this.selectedFileUrl = reader.result;
            this.demoImage.getImage(this.selectedFileUrl);
        };
    }

    /*onUpload(): void {
        const pictureFile = new FormData();
        pictureFile.append('image', this.selectedFile, this.selectedFile.name);
        localStorage.set(this.selectedFile.name, pictureFile);
        // this.apiService.post('/products', pictureFile, null)
        //     .subscribe(res => {
        //         console.log(res);
        //         console.log(this.selectedFile);
        //     });

    }*/
}
