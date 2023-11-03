import { Inject, Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClienteDataInterface } from '../models/clienteDataInterface';

@Injectable({
    providedIn: 'root',
})
export class ClienteDataService {
    ClienteBaseUrl = this.config.configuration.url + '/clientes'; // URL to web api


    constructor(private http: HttpClient, @Inject('config') private config: any) {
        console.log("INTO SERVICE")
        console.log(config)
    }

    getClienteById(paramClienteId: number): Observable<ClienteDataInterface[]> {
        return this.http.get<ClienteDataInterface[]>(this.ClienteBaseUrl + '/' + paramClienteId).pipe(
            //catchError(console.log('Error on Get Employees'));
            catchError(this.handleError)
        );
    }

    getClienteAll(): Observable<ClienteDataInterface[]> {
        return this.http.get<ClienteDataInterface[]>(this.ClienteBaseUrl + "/").pipe(
            //catchError(console.log('Error on Get Employees'));
            catchError(this.handleError)
        );
    }

    addCliente(paramCliente: ClienteDataInterface): Observable<ClienteDataInterface> {
        return this.http
            .post<ClienteDataInterface>(this.ClienteBaseUrl + '/', paramCliente)
            .pipe(catchError(this.handleError));
    }

    updCliente(paramCliente: ClienteDataInterface): Observable<ClienteDataInterface> {
        return this.http
            .put<ClienteDataInterface>(this.ClienteBaseUrl + '/' + paramCliente.id, paramCliente)
            .pipe(catchError(this.handleError));
    }

    delCliente(paramClienteId: number): Observable<number> {
        return this.http
            .delete<number>(this.ClienteBaseUrl + '/' + paramClienteId)
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
