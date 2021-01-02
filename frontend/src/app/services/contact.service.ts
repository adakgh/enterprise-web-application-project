import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {RouteUtil} from '../utils/route.util';
import {ActivatedRoute} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    constructor(private apiService: ApiService,
                private route: ActivatedRoute) {
    }

    sendMail(message: string[]): Observable<any> {
        return this.apiService.post('/contact', message, null).pipe(
            map(res => {
                return res;
            })
        );
    }
}
