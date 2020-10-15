import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.validateLogin(state.url);
  }

  validateLogin(url: string): boolean {
    // check if a valid token is saved on the client-server
    if (sessionStorage.getItem('currentUser')) {
      return true;
    }
    // else redirect it to the login-page to create one
    this.router.navigate(['login']);
    return false;
  }
}
