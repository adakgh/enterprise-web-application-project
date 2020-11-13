import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RouteUtil} from '../utils/route.util';
import {ApiService} from './api.service';
import {map, tap} from 'rxjs/operators';
import {Supplier} from '../models/supplier';

@Injectable({
    providedIn: 'root'
})
export class SupplierInfoService {

    constructor(private routeUtil: RouteUtil,
                private apiService: ApiService) {
    }

    getSupplier(id: number): Observable<any> {
        const query = id;

        return this.apiService.get('/suppliers/' + query).pipe(
            map(res => {
                console.log('Data recieved for the supplierInfo Page: ');
                console.log(res);
                return res;
            })
        );
    }

    updateSupplier(supplier: Supplier): Observable<any> {
        return this.apiService.put('/suppliers', supplier, null);
    }

}
