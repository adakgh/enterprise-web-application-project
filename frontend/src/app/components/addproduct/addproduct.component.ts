import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddProductService} from '../../services/add-product.service';

// @ts-ignore
@Component({
    selector: 'app-addproduct',
    templateUrl: './addproduct.component.html',
    styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
    jsonData: any;
    private model: any = {};
    private errMsg: string;
    private addNewProduct: FormGroup;
    productList: any = {};
    selected: boolean;
    submitted: boolean;

    constructor(
        private apiService: ApiService,
        private router: Router,
        private formBuilder: FormBuilder,
        private addProductService: AddProductService
    ) {}

    ngOnInit(): void {
        this.addProductService.getProducts().subscribe(
            resp => {
                console.log(resp);
                this.productList = resp;
                console.log(this.productList[0].name);
            }, error => {
                console.log(error);
            }
        );
        this.addProductService.addProduct().subscribe(
            resp => {
                console.log(resp);
            }, error => {
                console.log(error);
            }
        );
    }

    addProduct(): void {
        this.apiService.post('/addproduct', this.model).subscribe(
            resp => {
                if (resp.token == null) {
                    this.errMsg = 'Niet alles is goed ingevuld';
                    return;
                }
                // save responseInfo (token, role, ...) for client-side routes
                sessionStorage.setItem('currentUser', JSON.stringify(resp));
                this.router.navigate(['/addproduct']).then(() => {
                    window.location.reload();
                });
            }, errResp => {
                this.errMsg = errResp.status;
            }
        );
    }

    register(): void {
        this.submitted = true;
        // stop here if form is invalid
        if (this.addNewProduct.invalid) {
            this.errMsg = 'Niet alles is goed ingevuld';
            return;
        } else {
            console.log(this.addNewProduct.value);
            // this.popUp();
            this.router.navigate(['/addproduct']).then(() => {
                window.location.reload();
            });
        }
    }

    // getting the form controls
    // tslint:disable-next-line:typedef
    get f() {
        return null;
    }

    // buildForm(): void {
    //     this.addNewProduct = this.formBuilder.group({
    //         type: ['customer'],
    //         company: ['', Validators.required],
    //         firstName: ['', Validators.required],
    //         lastName: ['', Validators.required],
    //         email: ['', [Validators.required, Validators.email]],
    //         confirmPassword: ['', Validators.required]
    //     });
    //
    // }
}
