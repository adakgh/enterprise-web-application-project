import {Component, OnInit} from '@angular/core';
import {AddProductService} from '../../services/add-product.service';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {DemoImage} from '../supplier-info/supplier-info-edit/default-image';

@Component({
    selector: 'app-addproduct',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})

// TODO 1. Adding a possiblity to add a picture to the page
// TODO 2. Giving a popup when the product is finished
// TODO 3. Styling the webpage
export class AddProductComponent implements OnInit {
    private errorMessage: string;
    jsonData: any;
    productList: any = {};
    productData: any = {};
    selectedFile: File = null;
    selectedFileUrl;
    categoryMap: any[];

    constructor(
        private apiService: ApiService,
        private addProductService: AddProductService,
        private router: Router,
        private productService: ProductService,
        public  demoImage: DemoImage
    ) {
    }

    ngOnInit(): void {
        this.demoImage.getImage(this.demoImage.imageBase64Url);
        this.productService.getAllCategories().subscribe(
            res => this.categoryMap = res
        );
    }

    addProduct(): void {
        if (this.selectedFile != null) {
            // Create a object with the supplier data and the selected image data and send that
            this.productData.imageName = this.selectedFile.name;
            this.productData.type = this.selectedFile.type;
            this.productData.url = this.selectedFileUrl;

            console.log(this.productData);

            this.apiService.post('/products', this.productData, null).subscribe(
                resp => {
                    // this.reloadProductPage();
                    console.log('Product added!');
                    console.log(this.productData);
                    console.log(resp);
                },
                error => {
                    this.errorMessage = error.status;
                    console.log(error);
                }
            );

        } else { // If no Image is selected only send the supplier data
            /*this.supplierInfoService.updateSupplier({supplier: this.supplier}).subscribe(
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
            );*/
        }
        /*
                this.apiService.post('/products', this.productData, null).subscribe(
                    resp => {
                        // this.reloadProductPage();
                        console.log(this.productData);
                    },
                    error => {
                        this.errorMessage = error.status;
                        console.log(error);
                    }
                );*/
    }

    reloadProductPage(): void {
        // Reload the page when send button is pressed
        this.router.navigate(['/addproduct']).then(() => {
            window.location.reload();
        });
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
