import { Inject, Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CarritoDataInterface } from '../models/carritoDataInterface';



@Injectable({
    providedIn: 'root',
})
export class CarritoDataService {
    CarritoBaseUrl = this.config.configuration.url + '/carritos'; // URL to web api


    constructor(private http: HttpClient, @Inject('config') private config: any) {
        console.log("INTO SERVICE")
        console.log(config)
    }

   
    getCarritoById(paramCarritoId: number): Observable<CarritoDataInterface[]> {
        return this.http.get<CarritoDataInterface[]>(this.CarritoBaseUrl + '/' + paramCarritoId).pipe(
            //catchError(console.log('Error on Get Employees'));
            catchError(this.handleError)
        );
    }

    getCarritoAll(): Observable<CarritoDataInterface[]> {
        return this.http.get<CarritoDataInterface[]>(this.CarritoBaseUrl + "/").pipe(
            //catchError(console.log('Error on Get Employees'));
            catchError(this.handleError)
        );
    }

    addCarrito(paramCarrito: CarritoDataInterface): Observable<CarritoDataInterface> {
        return this.http
            .post<CarritoDataInterface>(this.CarritoBaseUrl + '/', paramCarrito)
            .pipe(catchError(this.handleError));
    }

    updCarrito(paramCarrito: CarritoDataInterface): Observable<CarritoDataInterface> {
        return this.http
            .put<CarritoDataInterface>(this.CarritoBaseUrl + '/' + paramCarrito.id, paramCarrito)
            .pipe(catchError(this.handleError));
    }

    delCarrito(paramCarritoId: number): Observable<number> {
        return this.http
            .delete<number>(this.CarritoBaseUrl + '/' + paramCarritoId)
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
