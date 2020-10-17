import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './components/user/user.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuardService} from './guards/auth-guard.service';
import {LogoutComponent} from './components/logout/logout.component';
import {ProductComponent} from './components/product/product.component';
import {AddproductComponent} from './components/addproduct/addproduct.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'users', component: UserComponent, canActivate: [AuthGuardService]},
    {path: 'products', component: ProductComponent, /*canActivate: [AuthGuardService]*/ },
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'addproduct', component: AddproductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
