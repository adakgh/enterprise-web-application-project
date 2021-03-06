import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuardService} from './guards/auth-guard.service';
import {LogoutComponent} from './components/logout/logout.component';
import {ProductComponent} from './components/product/product.component';
import {SupplierInfoComponent} from './components/supplier-info/supplier-info.component';
import {SupplierInfoEditComponent} from './components/supplier-info/supplier-info-edit/supplier-info-edit.component';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {ContactComponent} from './components/contact/contact.component';
import {AddProductComponent} from './components/addproduct/add-product.component';
import {ErrorComponent} from './components/error/error.component';
import {RequestproductComponent} from './components/requestproduct/requestproduct.component';
import {AddrequestproductComponent} from './components/requestproduct/addrequestproduct/addrequestproduct.component';
import {SuppliersListComponent} from './components/suppliers-list/suppliers-list.component';
import {UnsavedChangesGuardService} from './guards/unsaved-changes-guard.service';
import {MyproductsComponent} from './components/myproducts/myproducts.component';
import {MyproductsEditComponent} from './components/myproducts/myproducts-edit/myproducts-edit.component';
import {VerifyUserComponent} from './components/verify-user/verify-user.component';
import {MessagesComponent} from './components/messages/messages.component';
import {FaqComponent} from './components/faq/faq.component';
import {TermsAndConditionsComponent} from './components/terms-and-conditions/terms-and-conditions.component';
import {PrivacyPolicyComponent} from './components/privacy-policy/privacy-policy.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'products', component: ProductComponent},
    {path: 'product-detail', component: ProductDetailComponent, /*canActivate: [AuthGuardService]*/},
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'supplierinfo', component: SupplierInfoComponent},
    {path: 'supplierinfo/edit', component: SupplierInfoEditComponent, canDeactivate: [UnsavedChangesGuardService]},
    {path: 'suppliers', component: SuppliersListComponent},
    {path: 'addproduct', component: AddProductComponent, canActivate: [AuthGuardService]},
    {path: 'myproducts', component: MyproductsComponent, canActivate: [AuthGuardService]},
    {path: 'myproducts/edit', component: MyproductsEditComponent, canActivate: [AuthGuardService]},
    {path: 'addrequestproduct', component: AddrequestproductComponent},
    {path: 'requestedproducts', component: RequestproductComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'verify', component: VerifyUserComponent},
    {path: 'messages', component: MessagesComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'terms-and-conditions', component: TermsAndConditionsComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    {path: 'error', component: ErrorComponent},
    {path: '**', redirectTo: '/error'} // If page not found: goes to error 404 page
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
