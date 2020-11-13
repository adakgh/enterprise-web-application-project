import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RouteUtil} from '../utils/route.util';
import {ApiService} from './api.service';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class InquiryService {

    constructor(private routeUtil: RouteUtil,
                private apiService: ApiService) {
    }

    // getting the inquiries
    getAllInquries(): Observable<any> {
        return this.apiService.get('/inquiries').pipe(
            tap(res => {
                console.log(res);
            })
        );
    }

    // getting the categories of inquiries
    getAllInquiryCategories(): Observable<any> {
        return this.apiService.get('/inquiries/categories').pipe(
            tap(res => {
                console.log(res);
            })
        );
    }

    // adding an inquiry
    addInquiry(inquiry: any): Observable<any> {
        return this.apiService.post('/inquiries', inquiry, null).pipe(
            tap(res => {
                console.log(res);
            })
        );
    }
}
