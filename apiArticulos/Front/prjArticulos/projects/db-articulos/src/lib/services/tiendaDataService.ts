import { Inject, Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TiendaDataInterface } from '../models/TiendaDataInterface';


@Injectable({
    providedIn: 'root',
})
export class TiendaDataService {
    TiendaBaseUrl = this.config.configuration.url + '/tiendas'; // URL to web api


    constructor(private http: HttpClient, @Inject('config') private config: any) {
        console.log("INTO SERVICE")
        console.log(config)
    }



    getTiendaById(paramTiendaId: number): Observable<TiendaDataInterface[]> {
        return this.http.get<TiendaDataInterface[]>(this.TiendaBaseUrl + '/' + paramTiendaId).pipe(
            //catchError(console.log('Error on Get Employees'));
            catchError(this.handleError)
        );
    }

    getTiendaAll(): Observable<TiendaDataInterface[]> {
        return this.http.get<TiendaDataInterface[]>(this.TiendaBaseUrl + "/").pipe(
            //catchError(console.log('Error on Get Employees'));
            catchError(this.handleError)
        );
    }

    addTienda(paramTienda: TiendaDataInterface): Observable<TiendaDataInterface> {
        return this.http
            .post<TiendaDataInterface>(this.TiendaBaseUrl + '/', paramTienda)
            .pipe(catchError(this.handleError));
    }

    updTienda(paramTienda: TiendaDataInterface): Observable<TiendaDataInterface> {
        return this.http
            .put<TiendaDataInterface>(this.TiendaBaseUrl + '/' + paramTienda.id, paramTienda)
            .pipe(catchError(this.handleError));
    }

    delTienda(paramTiendaId: number): Observable<number> {
        return this.http
            .delete<number>(this.TiendaBaseUrl + '/' + paramTiendaId)
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
