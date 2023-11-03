import { Inject, Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TiendaArticuloDataInterface } from '../models/tiendaArticuloDataInterface';


    @Injectable({
      providedIn: 'root',
    })
    export class TiendaArticuloDataService {
      TiendaArticuloBaseUrl = this.config.configuration.url + '/tiendaarticulos'; // URL to web api
    
      
      constructor(private http: HttpClient, @Inject('config') private config: any) {
        console.log("INTO SERVICE")
        console.log(config)
      }

      getTiendaArticuloById(paramTiendaArticuloId: number): Observable< TiendaArticuloDataInterface[] > {
        return this.http.get< TiendaArticuloDataInterface[] >(this.TiendaArticuloBaseUrl + '/' + paramTiendaArticuloId).pipe(
          //catchError(console.log('Error on Get Employees'));
          catchError(this.handleError)
        );
      }

      getTiendaArticuloAll(): Observable< TiendaArticuloDataInterface[] > {
        return this.http.get< TiendaArticuloDataInterface[] >(this.TiendaArticuloBaseUrl + "/").pipe(
          //catchError(console.log('Error on Get Employees'));
          catchError(this.handleError)
        );
      }
   
      addTiendaArticulo(paramTiendaArticulo: TiendaArticuloDataInterface): Observable< TiendaArticuloDataInterface > {
        return this.http
          .post<  TiendaArticuloDataInterface >(this.TiendaArticuloBaseUrl + '/', paramTiendaArticulo)
          .pipe(catchError(this.handleError));
      }
    
      updTiendaArticulo(paramTiendaArticulo: TiendaArticuloDataInterface): Observable< TiendaArticuloDataInterface > {
        return this.http
          .put< TiendaArticuloDataInterface >(this.TiendaArticuloBaseUrl + '/' + paramTiendaArticulo.id, paramTiendaArticulo)
          .pipe(catchError(this.handleError));
      }
    
      delTiendaArticulo(paramTiendaArticuloId: number): Observable< number > {
        return this.http
          .delete< number >(this.TiendaArticuloBaseUrl + '/' + paramTiendaArticuloId)
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
    