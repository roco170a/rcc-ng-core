import { Inject, Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CarritoDetalleDataInterface } from '../models/carritoDetalleDataInterface';



@Injectable({
    providedIn: 'root',
})
export class CarritoDetalleDataService {
    CarritoDetalleBaseUrl = this.config.configuration.url + '/carritodetalles'; // URL to web api


    constructor(private http: HttpClient, @Inject('config') private config: any) {
        console.log("INTO SERVICE")
        console.log(config)
    }

    getCarritoDetalleById(paramCarritoDetalleId: number): Observable<CarritoDetalleDataInterface[]> {
        return this.http.get<CarritoDetalleDataInterface[]>(this.CarritoDetalleBaseUrl + '/' + paramCarritoDetalleId).pipe(
            //catchError(console.log('Error on Get Employees'));
            catchError(this.handleError)
        );
    }

    getCarritoDetalleAll(): Observable<CarritoDetalleDataInterface[]> {
        return this.http.get<CarritoDetalleDataInterface[]>(this.CarritoDetalleBaseUrl + "/").pipe(
            //catchError(console.log('Error on Get Employees'));
            catchError(this.handleError)
        );
    }

    addCarritoDetalle(paramCarritoDetalle: CarritoDetalleDataInterface): Observable<CarritoDetalleDataInterface> {
        return this.http
            .post<CarritoDetalleDataInterface>(this.CarritoDetalleBaseUrl + '/', paramCarritoDetalle)
            .pipe(catchError(this.handleError));
    }

    updCarritoDetalle(paramCarritoDetalle: CarritoDetalleDataInterface): Observable<CarritoDetalleDataInterface> {
        return this.http
            .put<CarritoDetalleDataInterface>(this.CarritoDetalleBaseUrl + '/' + paramCarritoDetalle.id, paramCarritoDetalle)
            .pipe(catchError(this.handleError));
    }

    delCarritoDetalle(paramCarritoDetalleId: number): Observable<number> {
        return this.http
            .delete<number>(this.CarritoDetalleBaseUrl + '/' + paramCarritoDetalleId)
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
