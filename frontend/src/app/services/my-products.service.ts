import { Injectable } from '@angular/core';
import {RouteUtil} from '../utils/route.util';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyProductsService {

    constructor(private routeUtil: RouteUtil,
                private apiService: ApiService) {
    }

    getAllMyProducts(): Observable<any> {
        const query = this.routeUtil.getUrlQuery();

        return this.apiService.get('/products' + query).pipe(
            map(res => {
                return res.content;
            })
        );
    }
}
