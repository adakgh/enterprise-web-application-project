import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './components/user/user.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuardService} from './guards/auth-guard.service';
import {LogoutComponent} from './components/logout/logout.component';
import {ProductComponent} from './components/product/product.component';
import {SupplierInfoComponent} from './components/supplier-info/supplier-info.component';
import {SupplierInfoEditComponent} from './components/supplier-info/supplier-info-edit/supplier-info-edit.component';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {ContactComponent} from './components/contact/contact.component';
import {AddproductComponent} from './components/addproduct/addproduct.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'users', component: UserComponent, canActivate: [AuthGuardService]},
    {path: 'products', component: ProductComponent, /*canActivate: [AuthGuardService]*/}, // people not logged in should also see products?
    {path: 'product-detail', component: ProductDetailComponent, /*canActivate: [AuthGuardService]*/},
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'supplierinfo', component: SupplierInfoComponent},
    {path: 'supplierinfo/edit', component: SupplierInfoEditComponent},
    {path: 'addproduct', component: AddproductComponent},
    {path: 'contact', component: ContactComponent},
    {path: '**', redirectTo: '/'} // If page not found: Would be nicer to have a 404 ERROR component
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
