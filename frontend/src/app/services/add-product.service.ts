import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {RouteUtil} from '../utils/route.util';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AddProductService {

    constructor(private routeUtil: RouteUtil,
                private apiService: ApiService) {
    }

    getProducts(): Observable<any> {
        const query = this.routeUtil.getUrlQuery();
        return this.apiService.get('/products' + query).pipe(
            tap(res => {
                console.log('Passing through pipeline');
            })
        );
    }

    addProduct(): Observable<any> {
        const product: any = {};
        return this.apiService.post('/products', product, null).pipe(
            tap(res => console.log('Received status: ' + res.status))
        );
    }
}
