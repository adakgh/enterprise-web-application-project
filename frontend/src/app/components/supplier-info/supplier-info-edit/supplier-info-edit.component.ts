import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {Supplier} from '../../../models/supplier';
import {SupplierInfoService} from '../../../services/supplier-info.service';
import {CurrentUserService} from '../../../services/current-user.service';
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-supplier-info-edit',
    templateUrl: './supplier-info-edit.component.html',
    styleUrls: ['./supplier-info-edit.component.css']
})
export class SupplierInfoEditComponent implements OnInit {

    @ViewChild('f', {static: false}) signupForm: NgForm;
    supplierId;
    supplier: Supplier;
    submitted = false;

    // Test Attributes
    defaultQuestion = 'teacher';
    answer = '';
    genders = ['male', 'female'];
    user = {
        username: '',
        email: '',
        secretQuestion: '',
        answer: '',
        gender: ''
    };

    constructor(
        private apiService: ApiService,
        private router: Router,
        private http: HttpClient,
        private supplierInfoService: SupplierInfoService,
        private activatedRoute: ActivatedRoute,
        private currentUserService: CurrentUserService
    ) {
    }

    // Look at the query and based on that show the data of the supplier
    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(
            res => {
                // If there is no query given return user to homepage or if the supplier id in the query
                // is not equal to the logged in supplier
                if (res.id <= 0 || res.id == null || this.currentUserService.getSupplierId() != res.id) {
                    this.router.navigate(['/']);
                    return;
                }
                this.loadSupplierData(res.id);
            },
            err => {
                console.log('Can not find endPoint' + err);
            });
    }

    // Load all data of the supplier with the given id
    loadSupplierData(id: number): void {
        this.supplierInfoService.getSupplier(id).subscribe(
            res => {
                this.supplierId = res.id;
                this.supplier = new Supplier();
                // Transform the retrieved data into the supplier model
                this.supplier.companyName = res.companyName != null ? res.companyName : '';
                this.supplier.contactPerson = res.contactPerson != null ? res.contactPerson : '';
                this.supplier.contactEmail = res.contactEmail != null ? res.contactEmail : '';
                this.supplier.website = res.website != null ? res.website : '';
                this.supplier.phoneNumber = res.phoneNumber != null ? res.phoneNumber : '';
                this.supplier.shortDescription = res.shortDescription != null ? res.shortDescription : '';
                this.supplier.description = res.description != null ? res.description : '';

                // Get the adress value and put it in the supplier model
                if (res.addresses.length <= 0) {
                    this.supplier.addresses = [{
                        id: '',
                        street: '',
                        number: '',
                        postalCode: '',
                        city: '',
                        country: '',
                    }];
                } else {
                    this.supplier.addresses = [{
                        id: res.addresses[0].id,
                        street: res.addresses[0].street,
                        number: res.addresses[0].number,
                        postalCode: res.addresses[0].postalCode,
                        city: res.addresses[0].city,
                        country: res.addresses[0].country,
                    }];
                }

            },
            err => {
                console.log(err);
            }
        );
    }

    // Gets triggered when user(supplier) is done editing and click the button to update
    onUpdateSupplier(): void {
        this.supplierInfoService.updateSupplier(this.supplier).subscribe(
            res => {
                this.submitted = true;
                console.log('Succesfully updated shizzle.');
                console.log(this.signupForm);
                // console.log(this.supplier);
                this.router.navigate(['../'], {relativeTo: this.activatedRoute, queryParams: {id: this.supplierId}});
            },
            err => {
                console.log(err);
            }
        );
    }

    @HostListener('window:beforeunload')
    canDeactivate(): boolean {
        // If there is something changed WARN the user
        if (this.signupForm.dirty) {
            if (!this.submitted) {
                return confirm('Wijzigingen die u heeft gemaakt zullen niet worden opgeslagen, weet u zeker dat u de pagina wilt verlaten?');
            }
        }
        return true;
    }

    // CHUNK TEST METHODS

    /*onSubmit() {
        // this.submitted = true;
        /!*this.user.username = this.signupForm.value.userData.username;
        this.user.email = this.signupForm.value.userData.email;
        this.user.secretQuestion = this.signupForm.value.secret;
        this.user.answer = this.signupForm.value.questionAnswer;
        this.user.gender = this.signupForm.value.gender;

        this.signupForm.reset();*!/
    }
*/

    // onSubmit(form: NgForm) {
    //   console.log(form);
    // }

    /*suggestUserName() {
        const suggestedName = 'Superuser';
        // this.signupForm.setValue({
        //   userData: {
        //     username: suggestedName,
        //     email: ''
        //   },
        //   secret: 'pet',
        //   questionAnswer: '',
        //   gender: 'male'
        // });
        this.signupForm.form.patchValue({
            userData: {
                username: suggestedName
            }
        });
    }*/

}
