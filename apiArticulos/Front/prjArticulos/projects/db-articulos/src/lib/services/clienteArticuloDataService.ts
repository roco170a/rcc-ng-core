import { Inject, Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClienteArticuloDataInterface } from '../models/clienteArticuloDataInterface';

@Injectable({
    providedIn: 'root',
})
export class ClienteArticuloDataService {
    ClienteArticuloBaseUrl = this.config.configuration.url + '/clientearticulos'; // URL to web api


    constructor(private http: HttpClient, @Inject('config') private config: any) {
        console.log("INTO SERVICE")
        console.log(config)
    }


    getClienteArticuloById(paramClienteArticuloId: number): Observable<ClienteArticuloDataInterface[]> {
        return this.http.get<ClienteArticuloDataInterface[]>(this.ClienteArticuloBaseUrl + '/' + paramClienteArticuloId).pipe(
            //catchError(console.log('Error on Get Employees'));
            catchError(this.handleError)
        );
    }

    getClienteArticuloAll(): Observable<ClienteArticuloDataInterface[]> {
        return this.http.get<ClienteArticuloDataInterface[]>(this.ClienteArticuloBaseUrl + "/").pipe(
            //catchError(console.log('Error on Get Employees'));
            catchError(this.handleError)
        );
    }

    addClienteArticulo(paramClienteArticulo: ClienteArticuloDataInterface): Observable<ClienteArticuloDataInterface> {
        return this.http
            .post<ClienteArticuloDataInterface>(this.ClienteArticuloBaseUrl + '/', paramClienteArticulo)
            .pipe(catchError(this.handleError));
    }

    updClienteArticulo(paramClienteArticulo: ClienteArticuloDataInterface): Observable<ClienteArticuloDataInterface> {
        return this.http
            .put<ClienteArticuloDataInterface>(this.ClienteArticuloBaseUrl + '/' + paramClienteArticulo.id, paramClienteArticulo)
            .pipe(catchError(this.handleError));
    }

    delClienteArticulo(paramClienteArticuloId: number): Observable<number> {
        return this.http
            .delete<number>(this.ClienteArticuloBaseUrl + '/' + paramClienteArticuloId)
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
