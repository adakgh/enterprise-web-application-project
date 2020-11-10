import {Injectable} from '@angular/core';
import {TokenService} from './token.service';
import {CookieOptions, CookieService} from 'ngx-cookie';
import {AuthResponse} from '../models/responses/auth-response.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    readonly tokenRef = 'access_token';

    constructor(private tokenService: TokenService,
                private cookieService: CookieService) {}

    registerAuthentication(resp: AuthResponse): void {
        this.setAuthentication(resp.accessToken);
    }

    isAuthenticated(): boolean {
        return this.cookieService.hasKey(this.tokenRef);
    }

    getAuthentication(): string {
        return this.cookieService.get(this.tokenRef);
    }

    setAuthentication(accessToken: string): void {
        // TODO: do I need a 'secure' option with sameSite: 'strict' ?
        const options: CookieOptions = {
            sameSite: 'strict',
            expires: new Date(this.tokenService.decodeClaimsFromToken(accessToken).exp * 1000)
        };
        this.cookieService.put(this.tokenRef, accessToken, options);
    }

    deleteAuthentication(): void {
        this.cookieService.remove(this.tokenRef);
    }
}
