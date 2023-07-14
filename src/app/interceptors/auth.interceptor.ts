import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAuthToken(request));
  }

  addAuthToken = (request: HttpRequest<any>) => {
    const loggedUser = this.authService.getLoggedUser()

    if(loggedUser) {
      return request.clone({
        setHeaders: {
          "Authorization": "Bearer" + loggedUser.accessToken
        }
      })
    }
    return request
  }
  
  addTokenToBuy = (request: HttpRequest<any>) => {
    const loggedUser = this.authService.getLoggedUser()

    if(loggedUser) {
      return request.clone({
        setHeaders: {
          "Authorization": "Bearer" + loggedUser.accessToken
        }
      })
    }
    return request
  }
}
