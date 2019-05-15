import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, flatMap, } from 'rxjs/operators';

@Injectable()
export class APIHelperService {

    constructor(
        private http: HttpClient
    ) { }

    public post(url: string, body: any, httpHeaders: any): Observable<any> {
        try {
            return this.http.post<any>(url, body, httpHeaders).pipe(
                tap( response => {
                    // console.log(response);
                }),
                catchError(this.handleError)
            );
        } catch(ex) {
            throw new Error(ex);
        }
    }

    public put(url: string, body: any, httpHeaders: any): Observable<any> {
        try {
            return this.http.put<any>(url, body, httpHeaders).pipe(
                tap( response => {
                    // console.log(response);
                }),
                catchError(this.handleError)
            );
        } catch(ex) {
            throw new Error(ex);
        }
    }

    public get(url: string, httpHeaders: any): Observable<any> {
        try {
            return this.http.get<any>(url, httpHeaders).pipe(
                tap( response => {
                     console.log(response);
                }),
                catchError(this.handleError)
            );
        } catch(ex) {
            throw new Error(ex);
        }
    }

    public delete(url: string, httpHeaders: any): Observable<any> {
        try {
            return this.http.delete<any>(url, httpHeaders).pipe(
                tap( response => {
                     console.log(response);
                }),
                catchError(this.handleError)
            );
        } catch(ex) {
            throw new Error(ex);
        }
    }

    private handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        // window.alert(errorMessage);
        return throwError(error);
    }

}
