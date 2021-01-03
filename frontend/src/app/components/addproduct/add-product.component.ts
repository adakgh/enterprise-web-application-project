import {Component, OnInit} from '@angular/core';
import {AddProductService} from '../../services/add-product.service';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {DemoImage} from '../supplier-info/supplier-info-edit/default-image';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-addproduct',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
// TODO 1. Adding a possiblity to add a picture to the page
// TODO 2. Giving a popup when the product is finished
// TODO 3. Styling the webpage
export class AddProductComponent implements OnInit {
    MAX_DISCOUNTS = 4;          // The amount of Discount that is allowed

    discountPricesCount = 0;    // The Count for the amount of product Discounts
    productForm: FormGroup;     // The Product Form
    errorMessage: string;       // Error Message
    productData: any = {};      // The final Object that we send as the product to the backend
    unit: string;               // The Unit used for the products stock
    categoryMap: any[];         // The List of the Existing Categories
    selectedFile: File = null;  // This is the Image selected by the supplier
    selectedFileUrl;            // The src url of the selected Image, used to reflect the image immediately

    constructor(
        private apiService: ApiService,
        private addProductService: AddProductService,
        private router: Router,
        private productService: ProductService,
        public  demoImage: DemoImage
    ) {
    }

    /** Initialize the Add Product Page */
    ngOnInit(): void {

        // Initialize the Form (ReactiveForm)
        this.productForm = new FormGroup({
            title: new FormControl('', Validators.required),
            price: new FormControl('', Validators.required),
            stock: new FormControl('', Validators.required),
            unit: new FormControl('', Validators.required),
            category: new FormControl('', [Validators.required]),
            description: new FormControl('', Validators.required),
            productDiscounts: new FormArray([])
        });

        // Load the default image
        this.demoImage.getImage(this.demoImage.productBase64Url);

        // Load the existing Categories from the database in the form
        this.productService.getAllCategories().subscribe(
            res => this.categoryMap = res
        );
    }

    /** Adds product with the filled in details */
    addProduct(): void {
        if (this.selectedFile != null) {
            // Create a object with the supplier data and the selected image data and send that
            this.productData.imageName = this.selectedFile.name;
            this.productData.type = this.selectedFile.type;
            this.productData.url = this.selectedFileUrl;

            this.transfermFormDataInProductData();

            console.log(this.productData);

            this.apiService.post('/products', this.productData, null).subscribe(
                resp => {
                    console.log('Product added!');
                    console.log(this.productData);
                    console.log(resp);
                    this.router.navigate(['/..']).then(() => {
                    });
                },
                error => {
                    this.errorMessage = error.status;
                    console.log(error);
                }
            );

        } else { // If no Image is selected only send the product data

            this.transfermFormDataInProductData();

            console.log(this.productData);
            this.apiService.post('/products', this.productData, null).subscribe(
                resp => {
                    console.log('Product added!');
                    console.log(this.productData);
                    console.log(resp);
                    this.router.navigate(['/..']).then(() => {
                    });
                },
                error => {
                    this.errorMessage = error.status;
                    console.log(error);
                }
            );
        }
    }

    /** Gets triggered when user choises a Image, and stores the selected image */
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

    /** Helper for selecting the unit like Kilogram - Gram */
    selectedUnit(event): void {
        this.unit = event.target.value;
        this.unit = this.unit.split(' ')[1];
        this.unit = this.unit.replace('(', '');
        this.unit = this.unit.replace(')', '');
        console.log(this.unit);
    }

    /** This method return a string with the shorten of the unit for placing in the html */
    getUnit(): string {
        if (this.unit != null) {
            if (this.unit === 'g') {
                return '/kg';
            }

            return '/' + this.unit;
        }
        return '';
    }

    /** Add Discount Price fields MAX = 4 */
    addDiscountPrice(): void {
        if (this.discountPricesCount >= this.MAX_DISCOUNTS) {
            this.errorMessage = 'Je kan maximaal 4 Actie prijzen toevoegen';
            return;
        } else {
            this.discountPricesCount++;
            const control = new FormGroup({
                discountPrice: new FormControl('', Validators.required),
                discountQuantity: new FormControl('', Validators.required),
            });
            this.productDiscounts.push(control);
        }
    }

    /** Remove the Last Discount Price Field */
    removeLastDiscountPrice(): void {

        if (this.discountPricesCount >= 1) {
            this.productDiscounts.removeAt(this.productDiscounts.length - 1);
            this.discountPricesCount--;
            if (this.errorMessage) {
                this.errorMessage = null;
            }
        } else {
            return; // There is nothing to remove
        }
    }

    /** Get The Product Discounts Array */
    get productDiscounts(): any {
        return this.productForm.get('productDiscounts') as FormArray;
    }

    /** Puts the values of the Form into the productData object */
    transfermFormDataInProductData(): any {
        this.productData.title = this.productForm.value.title;
        this.productData.price = this.productForm.value.price;
        this.productData.stock = this.productForm.value.stock;
        this.productData.unit = this.productForm.value.unit;
        this.productData.category = this.productForm.value.category;
        this.productData.description = this.productForm.value.description;
        this.productData.productDiscounts = this.productDiscounts.value;
    }

    randomButton(): any {
        console.log('Productform:');
        console.log(this.productForm.value);
        console.log(this.productForm);
        console.log(this.productDiscounts);
        console.log(JSON.stringify(this.productDiscounts.value));

        this.transfermFormDataInProductData();
        console.log(this.productData);

    }
}
