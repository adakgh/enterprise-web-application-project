import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    constructor(private apiService: ApiService) {
    }

    register(user: any = {}): Observable<any> {
        return this.apiService.post('/users/register', user, new Map<string, string>()).pipe(
            tap()
        );
    }
}
