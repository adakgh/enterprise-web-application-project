import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RouteUtil {

    constructor(private route: ActivatedRoute,
                private router: Router) {
    }

    /**
     * Appends a new param to the url of this current route.
     */
    addParam(paramName: string, paramValue: string): void {
        const params = this.getParams();
        params[paramName] = paramValue;
        this.updateParams(params);
    }

    /**
     * Deletes a param from the url of this current route given its name identifier.
     */
    deleteParam(paramName: string): void {
        const params = this.getParams();
        delete params[paramName];
        this.updateParams(params);
    }

    /**
     * Clears all params from the url of this current route.
     */
    clearParams(): void {
        this.updateParams({});
    }

    /**
     * Retrieves the param query from the url of this current route. The returns value
     * is a string that can be appended to a request's endpoint url.
     */
    getUrlQuery(): string {
        return window.location.search;
    }

    /**
     * Convenience method to retrieve all params from the url of this current route.
     * Returns a JS-object containing all current params.
     */
    private getParams(): any {
        return Object.assign({}, this.route.snapshot.queryParams);
    }

    /**
     * Convenience method that updates the current params from the url in the current
     * route. No reload is executed for the current page.
     */
    private updateParams(params: any): void {
        this.router.navigate([], {relativeTo: this.route, queryParams: params});
    }
}
