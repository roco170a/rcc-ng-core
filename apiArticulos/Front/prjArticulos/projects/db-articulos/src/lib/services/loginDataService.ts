import { Inject, Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginDataInterface } from '../models/loginDataInterface';
import { environment } from 'projects/articulos/src/environments/environment';


@Injectable({
    providedIn: 'root',
})
export class LoginDataService {
    LoginBaseUrl = this.config.configuration.url + '/logins'; // URL to web api    
    public _authToken !: string;
  
    get authToken(): string | null {
      return localStorage.getItem('token'); //this._authToken;
    }

    login(userData: LoginDataInterface): Observable<any> {
      return this.http
        .post<LoginDataInterface>(this.LoginBaseUrl + '/Token', userData)
        .pipe(
          tap( (loginResult:any) => {
  
            this._authToken = loginResult.data.jwt;
            localStorage.setItem('token',this._authToken);
          } ),
          catchError(this.handleError)
          )
    }
  
    logout() {
        this._authToken = '';
        localStorage.removeItem('token');
    }

    constructor(private http: HttpClient, @Inject('config') private config: any) {
        console.log("INTO SERVICE")
        console.log(config)
    }

    getLoginById(paramLoginId: number): Observable<LoginDataInterface[]> {
        return this.http.get<LoginDataInterface[]>(this.LoginBaseUrl + '/' + paramLoginId).pipe(
            //catchError(console.log('Error on Get Employees'));
            catchError(this.handleError)
        );
    }

    getLoginAll(): Observable<LoginDataInterface[]> {
        return this.http.get<LoginDataInterface[]>(this.LoginBaseUrl + "/").pipe(
            //catchError(console.log('Error on Get Employees'));
            catchError(this.handleError)
        );
    }

    addLogin(paramLogin: LoginDataInterface): Observable<LoginDataInterface> {
        return this.http
            .post<LoginDataInterface>(this.LoginBaseUrl + '/', paramLogin)
            .pipe(catchError(this.handleError));
    }

    updLogin(paramLogin: LoginDataInterface): Observable<LoginDataInterface> {
        return this.http
            .put<LoginDataInterface>(this.LoginBaseUrl + '/' + paramLogin.id, paramLogin)
            .pipe(catchError(this.handleError));
    }

    delLogin(paramLoginId: number): Observable<number> {
        return this.http
            .delete<number>(this.LoginBaseUrl + '/' + paramLoginId)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, body was: `,
                error.error
            );
        }
        // Return an observable with a user-facing error message.
        return throwError(
            () => new Error('Something bad happened; please try again later.')
        );
    }

}
