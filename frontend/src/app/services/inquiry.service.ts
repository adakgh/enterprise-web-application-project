import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class InquiryService {
    constructor(private apiService: ApiService) {
    }

    // getting the inquiries
    getAllInquries(): Observable<any> {
        return this.apiService.get('/inquiries').pipe(
            tap());
    }

    // getting the categories of inquiries
    getAllInquiryCategories(): Observable<any> {
        return this.apiService.get('/inquiries/categories').pipe(
            tap());
    }

    // adding an inquiry
    addInquiry(inquiry: any): Observable<any> {
        return this.apiService.post('/inquiries', inquiry, null).pipe(
            tap());
    }
}
