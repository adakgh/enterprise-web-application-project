import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RouteUtil} from '../utils/route.util';
import {ApiService} from './api.service';
import {map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SupplierInfoService {

    constructor(private routeUtil: RouteUtil,
                private apiService: ApiService) {
    }

    getSupplier(id: number): Observable<any> {
        const query = id;
        console.log('Query Picked by the service: ');
        console.log(query);


        return this.apiService.get('/suppliers/' + query).pipe(
            map(res => {
                console.log('Data recieved: ');
                console.log(res);
                return res;
            })
        );
    }

    // tap = alleen de data wilt aflezen --> stuurt originele response door naar component.
    // map == aflezen + veranderen --> stuurt aangepaste data.
    getAllProduct(): Observable<any> {
        const query = this.routeUtil.getUrlQuery();
        return this.apiService.get('/products' + query).pipe(
            map(res => {
                return res.content;
            })
        );
    }

    getAllCategories(): Observable<any> {
        return this.apiService.get('/products/categories').pipe(
            map(res => {
                return res;
            })
        );
    }

    getPageableData(): Observable<any> {
        const query = this.routeUtil.getUrlQuery();
        return this.apiService.get('/products' + query).pipe(
            map(res => {
                return res.pageable;
            })
        );
    }
}
