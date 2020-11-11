import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {RouteUtil} from '../utils/route.util';
import {ApiService} from './api.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private routeUtil: RouteUtil,
              private apiService: ApiService) { }

  getAllProduct(): Observable<any> {
      const query = this.routeUtil.getUrlQuery();

      // tap = alleen de data wilt aflezen --> stuurt originele response door naar component.
      // map == aflezen + veranderen --> stuurt aangepaste data.

      return this.apiService.get('/products' + query).pipe(
          tap(res => {
              console.log(res);
          })
      );
  }
}
