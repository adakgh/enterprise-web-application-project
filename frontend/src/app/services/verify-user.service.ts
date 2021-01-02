import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class VerifyUserService {
    constructor(private apiService: ApiService,
                private route: ActivatedRoute) {
    }

    verifyRegister(token: string): Observable<any> {
        // obtaining token from the url
        token = this.route.snapshot.queryParams.token;
        // console.log('token: ' + token);
        return this.apiService.get('/users/verify?token=' + token).pipe(
            map(res => {
                return res;
            })
        );
    }
}
