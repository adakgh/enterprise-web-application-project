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

    unit: string;
    addNumber = 0;
    count = new Array();

    constructor(
        private apiService: ApiService,
        private addProductService: AddProductService,
        private router: Router,
        private productService: ProductService,
        public  demoImage: DemoImage
    ) {
    }

    ngOnInit(): void {
        this.demoImage.getImage(this.demoImage.productBase64Url);
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
                    console.log('Product added!');
                    console.log(this.productData);
                    console.log(resp);
                    this.reloadProductPage();
                },
                error => {
                    this.errorMessage = error.status;
                    console.log(error);
                }
            );

        } else { // If no Image is selected only send the product data
            console.log(this.productData);
            this.apiService.post('/products', this.productData, null).subscribe(
                resp => {
                    console.log('Product added!');
                    console.log(this.productData);
                    console.log(resp);
                    this.reloadProductPage();
                },
                error => {
                    this.errorMessage = error.status;
                    console.log(error);
                }
            );
        }
    }

    reloadProductPage(): void {
        // Reload the page when send button is pressed
        this.router.navigate(['/..']).then(() => {
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

    // helper for selecting the unit like Kilogram - Gram
    selectedUnit(event): void {
        this.unit = event.target.value;
        this.unit = this.unit.split(' ')[1];
        this.unit = this.unit.replace('(', '');
        this.unit = this.unit.replace(')', '');
        console.log(this.unit);
    }

    // this method return a string with the shorten of the unit for placing in the html
    getUnit(): string {
        if (this.unit != null) {
            if (this.unit === 'g') {
                return '/kg';
            }

            return '/' + this.unit;
        }
        return '';
    }

    countup(): void {
        if (this.addNumber === -1) {
            this.addNumber = 0;
        }
        if (this.addNumber <= 3) {
            this.count.push(this.addNumber);
            this.addNumber++;
            console.log(this.count);
        }
    }

    countdown(): void {
        if (this.addNumber >= 0) {
            this.count.splice(this.addNumber);
            this.addNumber--;
            console.log(this.count);
        }

    }
}
