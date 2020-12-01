import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private authHeaderRef = 'Authorization';

    constructor(
        private router: Router,
        private http: HttpClient,
        private authService: AuthService) {
    }

    get(url: string): Observable<any> {
        return this.http.get(environment.apiUrl + url, {headers: this.createHeaders(null)})
            .pipe(catchError((err) => this.errorHandler(err)));
    }

    getImage(url: string): Observable<any> {
        const headers = this.createHeaders(null);
        return this.http.get(environment.apiUrl + url,  {headers});
    }

    // tslint:disable-next-line:ban-types
    post(url: string, body: Object, headerFields: Map<string, string>): Observable<any> {
        const headers = this.createHeaders(headerFields);
        return this.http.post(environment.apiUrl + url, JSON.stringify(body), {headers})
            .pipe(catchError(err => this.errorHandler(err)));
    }

    // tslint:disable-next-line:ban-types
    put(url: string, body: Object, headerFields: Map<string, string>): Observable<any> {
        const headers = this.createHeaders(headerFields);
        return this.http.put(environment.apiUrl + url, JSON.stringify(body), {headers})
            .pipe(catchError(err => this.errorHandler(err)));
    }

    // tslint:disable-next-line:ban-types
    putImage(url: string, body: Object): Observable<any> {
        console.log("URL");
        console.log(url);
        console.log(JSON.stringify(body));
        console.log(body);
        console.log("BTAO");
        console.log(btoa(JSON.stringify(body)));

        const headers = this.createHeaders(null);
        return this.http.put(environment.apiUrl + url, (JSON.stringify(body)), {headers});
    }

    // tslint:disable-next-line:ban-types
    delete(url: string, headerFields: Map<string, string>): Observable<any> {
        const headers = this.createHeaders(headerFields);
        return this.http.delete(environment.apiUrl + url, {headers})
            .pipe(catchError(err => this.errorHandler(err)));
    }

    errorHandler(resp: HttpErrorResponse): any {
        const status = resp.status;
        // unauthorized
        if (status === 401) {
            this.router.navigate(['/logout']);
        }
        return throwError(resp.error.message || 'server error');
    }

    createHeaders(fields: Map<string, string>): HttpHeaders {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        if (fields) {
            fields.forEach((v, k) => headers = headers.append(k, v));
        }
        if (!headers.has(this.authHeaderRef) && this.authService.isAuthenticated()) {
            headers = headers.append(this.authHeaderRef, 'Bearer ' + this.authService.getAuthentication());
        }
        return headers;
    }
}
