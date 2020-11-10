import {Injectable} from '@angular/core';
import jwt_decode from 'jwt-decode';
import {Claims} from '../models/claims.model';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor() {}

    decodeClaimsFromToken(token: string): Claims {
        return jwt_decode(token) as Claims;
    }
}
