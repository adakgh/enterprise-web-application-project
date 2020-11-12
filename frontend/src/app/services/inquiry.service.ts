import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RouteUtil} from '../utils/route.util';
import {ApiService} from './api.service';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class InquiryService {
    requests: any[] = [];

    constructor(private routeUtil: RouteUtil,
                private apiService: ApiService) {
    }

    getAllInquries(): Observable<any> {
        const query = this.routeUtil.getUrlQuery();

        return this.apiService.get('/inquiries' + query).pipe(
            tap(res => {
                console.log(res);
                this.requests = res;
            })
        );
    }
}
