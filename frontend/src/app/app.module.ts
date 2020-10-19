import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import { LogoutComponent } from './components/logout/logout.component';
import { ProductComponent } from './components/product/product.component';
import { SupplierInfoComponent } from './components/supplier-info/supplier-info.component';
import { RecentProductComponent } from './components/supplier-info/recent-product/recent-product.component';
import { SupplierInfoEditComponent } from './components/supplier-info/supplier-info-edit/supplier-info-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    ProductComponent,
    SupplierInfoComponent,
    RecentProductComponent,
    SupplierInfoEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
import {UserComponent} from './components/user/user.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LogoutComponent} from './components/logout/logout.component';
import {ProductComponent} from './components/product/product.component';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';


@NgModule({
    declarations: [
        AppComponent,
        UserComponent,
        HomeComponent,
        LoginComponent,
        LogoutComponent,
        ProductComponent,
        ProductDetailComponent,
        NavbarComponent,
        FooterComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule
    ],
    providers: [],

    bootstrap: [AppComponent]
})
export class AppModule {
}
