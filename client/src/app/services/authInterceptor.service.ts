import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

          // Exclude the SendEmail request from interception
        if (request.url.includes('/Cromoteca')) {
          return next.handle(request);
        }

        const token = localStorage.getItem('token');
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
      
              if (err.status === 401) {
                this.router.navigateByUrl('/home');
              }
      
              return throwError(() => new Error('Error'))
            })
          );
    }
}