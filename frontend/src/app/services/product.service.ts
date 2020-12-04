import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RouteUtil} from '../utils/route.util';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productId: number;

    constructor(private routeUtil: RouteUtil,
                private apiService: ApiService) {
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

    // 1 product is sent to the HTML
    getOneProduct(id: number): Observable<any> {
        const query = id;

        return this.apiService.get('/products/' + query).pipe(
            map(res => {
                return res;
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

    getProductId(): number {
        if (this.productId == null) {}
        return this.productId;
    }

    updateProduct(id, body): Observable<any> {
        console.log('Laatste punt');
        return this.apiService.put('/products/' + id, body, null);
    }
}
