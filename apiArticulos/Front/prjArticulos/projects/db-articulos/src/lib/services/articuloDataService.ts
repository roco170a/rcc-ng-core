import { Inject, Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ArticuloDataInterface } from '../models/articuloDataInterface';


@Injectable({
    providedIn: 'root',
})
export class ArticuloDataService {

    ArticuloBaseUrl = this.config.configuration.url + '/articulos'; // URL to web api

    constructor(private http: HttpClient, @Inject('config') private config: any) {
        console.log("INTO SERVICE")
        console.log(config)
    }



    getArticuloById(paramArticuloId: number): Observable<ArticuloDataInterface[]> {
        return this.http.get<ArticuloDataInterface[]>(this.ArticuloBaseUrl + '/' + paramArticuloId).pipe(
            //catchError(console.log('Error on Get Employees'));
            catchError(this.handleError)
        );
    }

    getArticuloAll(): Observable<ArticuloDataInterface[]> {
        return this.http.get<ArticuloDataInterface[]>(this.ArticuloBaseUrl + "/").pipe(
            //catchError(console.log('Error on Get Employees'));
            catchError(this.handleError)
        );
    }

    addArticulo(paramArticulo: ArticuloDataInterface): Observable<ArticuloDataInterface> {
        return this.http
            .post<ArticuloDataInterface>(this.ArticuloBaseUrl + '/', paramArticulo)
            .pipe(catchError(this.handleError));
    }

    updArticulo(paramArticulo: ArticuloDataInterface): Observable<ArticuloDataInterface> {
        return this.http
            .put<ArticuloDataInterface>(this.ArticuloBaseUrl + '/' + paramArticulo.id, paramArticulo)
            .pipe(catchError(this.handleError));
    }

    delArticulo(paramArticuloId: number): Observable<number> {
        return this.http
            .delete<number>(this.ArticuloBaseUrl + '/' + paramArticuloId)
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


