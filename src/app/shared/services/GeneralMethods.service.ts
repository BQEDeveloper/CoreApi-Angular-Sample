import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ConfigModel } from '../models/Config.model';
import { AuthResponseModel } from '../models/AuthResponse.model';

@Injectable()
export class GeneralMethodsService {

    config: ConfigModel;

    constructor(private http: HttpClient) { }

    public getConfig(): Observable<ConfigModel> {
        try{

            return new Observable((observer) => {
                observer.next(this.config);
                observer.complete();
            });
        } catch(ex) {
            throw new Error(ex);
        }
    }

    public saveAuthResponse(authResponse): void {
        try{
            localStorage.setItem('AuthResponse', JSON.stringify(authResponse));
        } catch(ex) {
            throw new Error(ex);
        }
    }

    public getAuthResponse(): AuthResponseModel {
        try {
            return JSON.parse(localStorage.getItem('AuthResponse')) as AuthResponseModel;
        } catch(ex) {
            throw new Error(ex);
        }
    }

    public generateRandomString(length = 20): string {
        try {
            const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let randomString = '';
            for (let i = 0; i < length; i++) {
                randomString += characters[Math.floor(Math.random() * (characters.length - 1)) + 0];
            }
            return randomString;

        } catch(ex) {
            throw new Error(ex);
        }
    }

    public base64UrlDecode(base64Url): string{
        try {
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            return window.atob(base64);
        } catch(ex) {
            throw new Error(ex);
        }
    }
}
