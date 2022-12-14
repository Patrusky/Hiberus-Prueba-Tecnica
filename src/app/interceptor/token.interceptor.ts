import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { catchError } from 'rxjs/operators'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService:TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addToken(request);
    return next.handle(request)
  }

  private addToken(request: HttpRequest<unknown>): HttpRequest<unknown>{
    const token = this.tokenService.getToken();
    if(token){
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
    return authReq;
  }
    return request;
  }



}
