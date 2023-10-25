import { Injectable, Injector } from '@angular/core';

import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { LoginService } from './services/login.service';

 

 

@Injectable({

  providedIn: 'root'

})

export class TokenInterceptorService implements HttpInterceptor {

 

  constructor(private authService: LoginService) { }

 

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let token = this.authService.getToken()

    if (token)

     { req = req.clone({ setHeaders: { 'Content-Type': 'application/json; charset=utf-8',

     Accept: 'application/json',

     Authorization: `Bearer ${token}` } });

    }

    else { req = req.clone({ setHeaders: { 'Content-Type': 'application/json; charset=utf-8',

     Accept: 'application/json' } }); }

     return next.handle(req);

     

  }

}