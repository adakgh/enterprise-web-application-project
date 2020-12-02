import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';

@Component({
    selector: 'app-myproducts-edit',
    templateUrl: './myproducts-edit.component.html',
    styleUrls: ['./myproducts-edit.component.css']
})
export class MyproductsEditComponent implements OnInit {
    private errorMessage: string;
    productId: string;
    jsonData: any[];
    productData: any = {};
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
                    this.productId = res.id;
                    return;
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
                console.log('Het werkt');
                this.jsonData = res;
                console.log(res);
            },
            err => {
                console.log('Het gaat op zijn bek');
                console.log(err);
            }
        );
    }

    updateProduct(): void {
        // Test if the values are getting placed in.
        this.productData.id = this.productId;
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
        this.router.navigate(['/myproducts']).then(() => {
            window.location.reload();
        });
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
