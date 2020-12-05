import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {CookieModule} from 'ngx-cookie';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './components/home/home.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductComponent} from './components/product/product.component';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {SupplierInfoComponent} from './components/supplier-info/supplier-info.component';
import {SupplierInfoEditComponent} from './components/supplier-info/supplier-info-edit/supplier-info-edit.component';
import {ContactComponent} from './components/contact/contact.component';
import {AddProductComponent} from './components/addproduct/add-product.component';
import {ErrorComponent} from './components/error/error.component';
import {RequestproductComponent} from './components/requestproduct/requestproduct.component';
import {AddrequestproductComponent} from './components/requestproduct/addrequestproduct/addrequestproduct.component';
import {MyproductsComponent} from './components/myproducts/myproducts.component';
import {MyproductsEditComponent} from './components/myproducts/myproducts-edit/myproducts-edit.component';
import {VerifyUserComponent} from './components/verify-user/verify-user.component';


import {SuppliersListComponent} from './components/suppliers-list/suppliers-list.component';
import {SupplierItemComponent} from './components/suppliers-list/supplier-item/supplier-item.component';
import {UnsavedChangesGuardService} from './guards/unsaved-changes-guard.service';
import {DemoImage} from './components/supplier-info/supplier-info-edit/default-image';
import {MessagesComponent} from './components/messages/messages.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        LogoutComponent,
        ProductComponent,
        ProductDetailComponent,
        NavbarComponent,
        FooterComponent,
        SupplierInfoComponent,
        SupplierInfoEditComponent,
        ContactComponent,
        AddProductComponent,
        ErrorComponent,
        RequestproductComponent,
        AddrequestproductComponent,
        MyproductsComponent,
        VerifyUserComponent,
        SuppliersListComponent,
        SupplierItemComponent,
        MyproductsEditComponent,
        MessagesComponent,
    ],
    imports: [
        CookieModule.forRoot(),
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
    ],
    providers: [UnsavedChangesGuardService, DemoImage],
    bootstrap: [AppComponent]
})
export class AppModule {
}
