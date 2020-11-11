import {Component, OnInit} from '@angular/core';
import {AddProductService} from '../../services/add-product.service';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-addproduct',
    templateUrl: './addproduct.component.html',
    styleUrls: ['./addproduct.component.css']
})

// TODO 1. Adding a possiblity to add a picture to the page
// TODO 2. Giving a popup when the product is finished
// TODO 3. Styling the webpage
export class AddproductComponent implements OnInit {
    private errorMessage: string;
    jsonData: any;
    productList: any = {};
    productData: any = {};
    selectedFile = null;

    constructor(
        private apiService: ApiService,
        private addProductService: AddProductService,
        private router: Router,
        private http: HttpClient
    ) {
    }

    ngOnInit(): void {
    }

    addProduct(): void {
        // Test if the values are getting placed in.
        console.log(this.productData);
        // this.apiService.post('/products', this.productData, null).subscribe(
        //     resp => {
        //         this.reloadProductPage();
        //         console.log(this.productData);
        //     },
        //     error => {
        //         this.errorMessage = error.status;
        //         console.log(error);
        //     }
        // );
    }

    reloadProductPage(): void {
        // Reload the page when send button is pressed
        this.router.navigate(['/addproduct']).then(() => {
            window.location.reload();
        });
    }

    // onFileSelected(event): void{
    //     this.selectedFile = event.target.files[0];
    //     console.log(event);
    // }
    //
    // onUpload(event): void {
    //     this.http.post('/addproduct')
    // }
}
