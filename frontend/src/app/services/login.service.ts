import {Injectable} from '@angular/core';
import {LoginData} from '../models/login-data.model';
import {ApiService} from './api.service';
import {ActivatedRoute} from '@angular/router';
import {RouteUtil} from '../utils/route.util';
import {AuthService} from './auth.service';
import {CurrentUserService} from './current-user.service';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private routeService: RouteUtil,
                private route: ActivatedRoute,
                private apiService: ApiService,
                private authService: AuthService,
                private currentUserService: CurrentUserService) {
    }

    requestAccessToken(loginData: LoginData): Observable<any> {
        const product: any = {};
        product.name = 'roboerot';

        const headerField = new Map().set('Authorization', this.encodeCredentials(loginData));
        return this.apiService.post('/auth/token' + this.routeService.getUrlQuery(), null, headerField).pipe(
            tap(res => {
                this.authService.registerAuthentication(res);
                this.currentUserService.update();
            })
        );
    }

    encodeCredentials(loginData: LoginData): string {
        return 'Basic ' + btoa(loginData.username + ':' + loginData.password);
    }
}
