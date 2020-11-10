import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private router: Router,
                private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.validatePermissions(state.url);
    }

    validatePermissions(url: string): boolean {
        // check if a valid token is saved on the client-server
        if (this.authService.isAuthenticated()) {
            return true;
        }
        // else redirect it to the login-page to create one
        this.router.navigate(['login']);
        return false;
    }
}
