import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDataService } from './loginDataService';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  
  public authToken !: string;

  constructor( private _loginService : LoginDataService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    if (req.url.endsWith('login')) {
      const newReq = req.clone({
        headers : req.headers        
        .set('reference','001')
      })

      return next.handle(newReq);
    }

    return next.handle(
      this.applyToken(req)
      );
  }

  applyToken(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      headers : req.headers
      .set(
        'Authorization',
        'Bearer ' + this._loginService.authToken
      )
      .set('reference','001')
      //.set('Origin','www.oficina-estrategica.com')
    })
  }

}
