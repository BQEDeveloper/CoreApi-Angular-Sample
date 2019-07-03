import { Injectable, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GeneralMethodsService } from './GeneralMethods.service';
import { AuthResponseModel } from '../models/AuthResponse.model';
import { ConfigModel } from '../models/Config.model';
import { APIHelperService } from './APIHelper.service';
import { Router } from '@angular/router';
import { JWTModel, JWTheader } from '../models/JWT.model';
import { JWKSModel } from '../models/JWKS.model';

@Injectable()
export class JWTService implements OnInit {

    authResponse: AuthResponseModel;
    config: ConfigModel;
    httpHeaders: any;
    id_token: any;
    jwt: JWTModel;
    jwks: JWKSModel;

    constructor(
        private generalMethodsService: GeneralMethodsService,
        private apiHelperService: APIHelperService,
        private router: Router
    ) {
        this.jwt = new JWTModel();
        this.httpHeaders = {
            headers: new HttpHeaders(
                {
                    accept: 'application/json',
                    'content-type': 'application/json'
                }
            )
        };
    }

    ngOnInit() {

    }

    public decodeJWT(id_token: any): JWTModel {
        try {
            this.jwt.header = JSON.parse(this.generalMethodsService.base64UrlDecode(id_token.split('.')[0]));
            this.jwt.payload = JSON.parse(this.generalMethodsService.base64UrlDecode(id_token.split('.')[1]));
            this.jwt.signature = this.generalMethodsService.base64UrlDecode(id_token.split('.')[2]);
            return this.jwt;
        } catch (ex) {
            throw new Error(ex);
        }
    }

    public validateJWT(jwt): Observable<any> {
        try {
            this.jwt = jwt;
            return new Observable((observer) => {
                this.generalMethodsService.getConfig()
                .subscribe(
                    config => {
                        this.config = config;
                        this.apiHelperService.get(this.config.CoreIdentityBaseUrl + '/.well-known/openid-configuration/jwks', this.httpHeaders)
                            .subscribe(
                            response => {
                                    this.jwks = response.keys[0];
                                    observer.next(this.validateJWTHeader() && this.validateJWTPayload() && this.verifyJWTSingature() ? true : false);
                                    observer.complete();
                                }
                            );
                    }
                );
            });
            
        } catch (ex) {
            throw new Error(ex);
        }

    }

    private validateJWTHeader(): boolean {
        try {
            // verify whether algorithm mentioned in Id Token (JWT) matches to the one in JWKS
            if (this.jwt.header.alg !== this.jwks.alg) {
               throw new Error('JWT algorithm doesn\'t match to the one mentioned in the Core API JWKS');
            }
            // verify whether kid mentioned in Id Token (JWT) matches to the one in JWKS
            if (this.jwt.header.kid !== this.jwks.kid) {
               throw new Error('JWT kid doesn\'t match to the one mentioned in the Core API JWKS');
            }
            return true;

        } catch (ex) {
            throw new Error(ex);
        }
    }

    private validateJWTPayload(): boolean {
        try {
            // verify issuer (iss) mentioned in Id Token (JWT) matches to the one in config.ini
            if (this.jwt.payload.iss !== this.config.CoreIdentityBaseUrl) {
               throw new Error('JWT issuer (iss) doesn\'t match to the one mentioned in the config.ini');
            }
            // verify audience (aud) mentioned in Id Token (JWT) matches to the one in config.ini
            if (this.jwt.payload.aud !== this.config.ClientID) {
               throw new Error('JWT audience (aud) doesn\'t match to the one mentioned in the config.ini');
            }
            // verify expiry time (exp) mentioned in Id Token (JWT) has not passed
            if (parseFloat(this.jwt.payload.exp) < (+ new Date()) / 1000) {
               throw new Error('JWT expiry time (exp) has already passed. Verify if your Workstation timezone (current timestamp) is correct or the JWT is already expired.');
            }
            return true;

        } catch (ex) {
            throw new Error(ex);
        }
    }

    private verifyJWTSingature(): boolean {
        try {
            // implement RSA algorithm to validate Signature or use third party JS to do so.
            return true;

        } catch (ex) {
            throw new Error(ex);
        }
    }



}
