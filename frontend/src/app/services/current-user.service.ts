import {Injectable} from '@angular/core';
import {Claims} from '../models/claims.model';
import {AuthService} from './auth.service';
import {TokenService} from './token.service';

@Injectable({
    providedIn: 'root'
})
export class CurrentUserService {

    private accessExpiredAt: Date;
    private username: string;
    private userId: number;
    private roles: Set<string>;

    constructor(private authService: AuthService,
                private tokenService: TokenService) {
    }

    update(): void {
        const token: string = this.authService.getAuthentication();
        if (token) {
            const claims: Claims = this.tokenService.decodeClaimsFromToken(token);
            this.accessExpiredAt = new Date(claims.exp * 1000);
            this.username = claims.sub;
            this.userId = claims.uid;
            this.roles = new Set<string>();
            claims.roles.split(',').forEach(role => this.roles.add(role));
        }
    }

    getUsername(): string {
        if (this.username == null) { this.update(); }
        return this.username;
    }

    getUserId(): number {
        if (this.userId == null) { this.update(); }
        return this.userId;
    }

    getTimeLeftBeforeLogout(): number {
        return this.accessExpiredAt.getTime();
    }

    isAdmin(): boolean {
        if (this.roles == null) { this.update(); }
        return this.roles.has('ROLE_ADMIN');
    }

    isSupplier(): boolean {
        if (this.roles == null) { this.update(); }
        return this.roles.has('ROLE_SUPPLIER');
    }

    isCustomer(): boolean {
        if (this.roles == null) { this.update(); }
        return this.roles.has('ROLE_CUSTOMER');
    }
}
