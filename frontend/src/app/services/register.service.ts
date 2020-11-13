import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    constructor(private apiService: ApiService) {}

    register(user: any): Observable<any> {
        return this.apiService.post('/users/register', user, new Map<string, string>()).pipe(
            tap(res => {
                console.log(res);
            })
        );
    }
}
