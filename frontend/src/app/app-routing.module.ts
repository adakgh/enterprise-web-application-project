import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './components/user/user.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuardService} from './guards/auth-guard.service';
import {LogoutComponent} from './components/logout/logout.component';
import {ProductComponent} from './components/product/product.component';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'users', component: UserComponent, canActivate: [AuthGuardService]},
    {path: 'products', component: ProductComponent, canActivate: [AuthGuardService]},
    {path: 'product-detail', component: ProductDetailComponent, canActivate: [AuthGuardService]},
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
