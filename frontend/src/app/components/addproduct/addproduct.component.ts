import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
    selected: boolean;
    submitted: boolean;

    constructor(private apiService: ApiService, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
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
        return this.addNewProduct.controls;
    }

    buildForm(): void {
        this.addNewProduct = this.formBuilder.group({
            type: ['customer'],
            company: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            confirmPassword: ['', Validators.required]
        });

    }
}
