import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ContactService {
    constructor(private apiService: ApiService) {
    }

    sendMail(message): Observable<any> {
        return this.apiService.post('/contact', message, null).pipe(
            map(res => {
                return res;
            })
        );
    }
}
