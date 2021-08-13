import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GeneralMethodsService } from './GeneralMethods.service';
import { AuthResponseModel } from '../models/AuthResponse.model';
import { ConfigModel } from '../models/Config.model';
import { APIHelperService } from './APIHelper.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    authResponse: AuthResponseModel;
    config: ConfigModel;
    httpHeaders: any;
    constructor(
        private generalMethodsService: GeneralMethodsService,
        private apiHelperService: APIHelperService,
        private router: Router
    ) {
         this.httpHeaders = {
            headers: new HttpHeaders(
                { 'Content-Type': 'application/x-www-form-urlencoded'
                }
            )
        };
    }

    public connectToCore(): void {
        try {
            const state = encodeURI(this.generalMethodsService.generateRandomString());
            localStorage.setItem('state', state);
            this.generalMethodsService.getConfig()
            .subscribe(
                    config => {
                        this.config = config;
                        window.location.href = this.config.CoreIdentityBaseUrl + '/connect/authorize?client_id=' + this.config.ClientID
                                            + '&response_type=code&scope=' + this.config.Scopes + '&redirect_uri=' + this.config.RedirectURI
                                            + '&state=' + state;
                    }
            );
        } catch(ex) {
            throw new Error(ex);
        }
    }

    public authorize(code: string): Observable<any> {
        try {
            return new Observable((observer) => {
                this.generalMethodsService.getConfig()
                .subscribe(
                    config => {
                        this.config = config;
                        this.excahangeCodeForToken(code).subscribe(
                           authResponse => {
                                if(authResponse?.endpoint?.endsWith('/'))
                                    authResponse.endpoint = authResponse.endpoint.slice(0, -1);
                                this.generalMethodsService.saveAuthResponse(authResponse);
                                observer.next(authResponse);
                                observer.complete();
                            }
                        );
                    }
                );
            });
        } catch(ex) {
            throw new Error(ex);
        }

    }

    public excahangeCodeForToken(code: string): Observable<any> {
        try {
            const body = 'code=' + code + '&redirect_uri=' + this.config.RedirectURI 
                        + '&grant_type=authorization_code&client_id=' + this.config.ClientID;

            return this.apiHelperService.post(this.config.CoreIdentityBaseUrl + '/connect/token', body, this.httpHeaders).
                pipe(
                    tap( authResponse => {
                        this.authResponse = authResponse;
                    })
                );

        } catch(ex) {
            throw new Error(ex);
        }
    }

    public isValidState(state: string): boolean {
        try {
            return encodeURI(state) === localStorage.getItem('state') ? true : false;
        } catch (ex) {
            throw new Error(ex);
        }
    }

    public disconnectFromCore(): void {
        try {
            this.generalMethodsService.getConfig()
                .subscribe(
                    config => {
                        this.config = config;
                        this.authResponse = this.generalMethodsService.getAuthResponse();
                        const body = 'token=' + this.authResponse.access_token + '&client_id=' + this.config.ClientID;
                        this.apiHelperService.post(this.config.CoreIdentityBaseUrl + '/connect/revocation', body, this.httpHeaders).
                            subscribe(
                               response => {
                                this.generalMethodsService.saveAuthResponse(null);
                                this.router.navigateByUrl('');
                            });
                    }
                );

        } catch (ex) {
            throw new Error(ex);
        }
    }



}
