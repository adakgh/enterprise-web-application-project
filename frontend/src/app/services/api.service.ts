import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) {}

    get(url: string, urlParams?: HttpParams): Observable<any> {
        return this.http.get(environment.restUrl + url, {headers: this.getHeaders()})
            .pipe(catchError((err) => this.errorHandler(err)));
    }

    // tslint:disable-next-line:ban-types
    post(url: string, body: Object): Observable<any> {
        return this.http.post(environment.restUrl + url, JSON.stringify(body), {headers: this.getHeaders()})
            .pipe(catchError((err) => this.errorHandler(err)));
    }

    errorHandler(error: HttpErrorResponse): any {
        if (error.status === 401) {
            this.router.navigate(['/logout']);
        }
        return throwError(error.message || 'server error');
    }

    getHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        const sessionInfo = sessionStorage.getItem('currentUser');
        if (sessionInfo) {
            headers = headers.append('Authorization', JSON.parse(sessionInfo).token);
        }
        return headers;
    }
}
