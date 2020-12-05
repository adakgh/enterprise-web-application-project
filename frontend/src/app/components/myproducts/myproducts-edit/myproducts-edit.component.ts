import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {Product} from '../../../models/product';

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

    constructor(
        private apiService: ApiService,
        private router: Router,
        private productService: ProductService,
        private activatedRoute: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
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
                this.productId = res.id;
                this.productData.name = res.name != null ? res.name : '';
                this.productData.price = res.price != null ? res.price : '';
                this.productData.quantity2 = res.quantity2 != null ? res.quantity2 : '';
                this.productData.description = res.description != null ? res.description : '';
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
                this.reloadProductPage();
            },
            error => {
                console.log(error);
            }
        );
    }

    reloadProductPage(): void {
        // Reload the page when send button is pressed
        // this.router.navigate(['/myproducts']).then(() => {
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
