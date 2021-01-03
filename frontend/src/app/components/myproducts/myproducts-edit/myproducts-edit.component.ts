import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {Product} from '../../../models/product';
import {DemoImage} from '../../supplier-info/supplier-info-edit/default-image';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-myproducts-edit',
    templateUrl: './myproducts-edit.component.html',
    styleUrls: ['./myproducts-edit.component.css']
})
export class MyproductsEditComponent implements OnInit {
    MAX_DISCOUNTS = 4;          // The amount of Discount that is allowed

    errorMessage: string;       // Error Message
    productId;                  // The id of this product
    supplierId: number;         // The supplier id, owner of this product
    productData: any = {};      // The final Object that we send as the product to the backend
    categoryMap: any[];         // The List of the Existing Categories
    selectedFile: File = null;  // This is the Image selected by the supplier
    selectedFileUrl;            // The src url of the selected Image, used to reflect the image immediately

    productForm: FormGroup;     // The Product Form
    discountPricesCount = 0;    // The Count for the amount of product Discounts
    unit: string;               // The Unit used for the products stock

    generatedImage;

    @ViewChild('quantity') quantity;

    constructor(
        private apiService: ApiService,
        private router: Router,
        private productService: ProductService,
        private activatedRoute: ActivatedRoute,
        public demoImage: DemoImage
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

        // Subscribe to the queryParams for the productId
        this.activatedRoute.queryParams.subscribe(
            res => {
                if (res.id <= 0 || res.id == null) {
                }
                this.loadProduct(res.id);
            },
            err => {
                console.log('Can not find endPoint' + err);
            });

        // Load the existing Categories from the database in the form
        this.productService.getAllCategories().subscribe(
            res => this.categoryMap = res
        );
    }

    /** Load the product from the productID in the queryParam */
    loadProduct(id: number): void {
        this.productService.getOneProduct(id).subscribe(
            res => {

                console.log(res);

                // Receive and store the values of the product
                this.productId = res.id;
                this.productData.title = res.name != null ? res.name : '';
                this.productData.price = res.price != null ? res.price : '';
                this.productData.stock = res.quantity != null ? res.quantity : '';
                this.productData.unit = res.unit != null ? res.unit : '';
                this.unit = this.productData.unit;
                this.productData.category = res.productCategory.id != null ? res.productCategory.id : '';
                this.productData.description = res.description != null ? res.description : '';
                this.supplierId = res.customData.supplierId;
                this.productData.productDiscounts = res.discounts;
                this.discountPricesCount = res.discounts.length;

                // Pre populate the field with the values of the product
                this.productForm.patchValue({
                    title: this.productData.title,
                    price: this.productData.price,
                    stock: this.productData.stock,
                    unit: this.productData.unit,
                    category: this.productData.category,
                    description: this.productData.description,
                });

                // Pre populate the product discount array items
                for(let i = 0; i < this.productData.productDiscounts.length; i++) {
                    this.productDiscounts.push(new FormGroup({
                        discountPrice: new FormControl(this.productData.productDiscounts[i].discountPrice),
                        discountQuantity: new FormControl(this.productData.productDiscounts[i].discountQuantity)
                    }));
                }

                // Act as the selectedUnit method but calles onInit once
                this.getUnitOnLoadData();

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

    /** Update the Product */
    updateProduct(): void {

        this.transfermFormDataInProductData();

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
                    console.log(resp);
                },
                error => {
                    console.log(error);
                }
            );

        } else { // If no Image is selected only send the supplier data

            console.log(this.productData);

            this.productService.updateProduct(this.productId, this.productData).subscribe(
                res => {
                    console.log('Succesfully updated product.');
                    console.log(res);
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

    // When loading data of product this function is called and it initializes the unit on the load data
    getUnitOnLoadData(): any {
        if (this.unit !== '') {
            this.unit = this.unit.split(' ')[1];
            this.unit = this.unit.replace('(', '');
            this.unit = this.unit.replace(')', '');
        }
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
