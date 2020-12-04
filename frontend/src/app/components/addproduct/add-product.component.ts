import {Component, OnInit} from '@angular/core';
import {AddProductService} from '../../services/add-product.service';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {ProductService} from '../../services/product.service';

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
    categoryMap: any[];

    constructor(
        private apiService: ApiService,
        private addProductService: AddProductService,
        private router: Router,
        private productService: ProductService
    ) {
    }

    ngOnInit(): void {
        this.productService.getAllCategories().subscribe(
            res => this.categoryMap = res
        );
    }

    addProduct(): void {
        // Test if the values are getting placed in.
        console.log(this.productData);
        this.apiService.post('/products', this.productData, null).subscribe(
            resp => {
                this.reloadProductPage();
                console.log(this.productData);
            },
            error => {
                this.errorMessage = error.status;
                console.log(error);
            }
        );
    }

    reloadProductPage(): void {
        // Reload the page when send button is pressed
        // this.router.navigate(['/addproduct']).then(() => {
        //     window.location.reload();
        // });
    }

    onFileSelected(event): void {
        this.selectedFile = event.target.files[0];
        console.log(event);
    }

    onUpload(): void {
        const pictureFile = new FormData();
        pictureFile.append('image', this.selectedFile, this.selectedFile.name);
        localStorage.set(this.selectedFile.name, pictureFile);
        // this.apiService.post('/products', pictureFile, null)
        //     .subscribe(res => {
        //         console.log(res);
        //         console.log(this.selectedFile);
        //     });

    }
}
