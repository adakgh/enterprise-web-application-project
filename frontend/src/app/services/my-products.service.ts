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

    getProduct(id: number): Observable<any>{
        const quary = id;

        return this.apiService.get('/product/' + quary).pipe(
            map(res => {
                console.log('Test');
                console.log(res);
                return res;
            })
        );
    }

    updateProduct(): Observable<any>{
        const product: any = {};
        return this.apiService.post('/products', product, null).pipe(
            tap(res => console.log('Received status: ' + res.status))
        );
    }
}

