import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, EMPTY, from, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth-service/auth.service.abstract';
import { Router } from '@angular/router';

export const unauthorizedErrorInterceptor: HttpInterceptorFn = (req, next) => {

  // điều kiện để không bị phụ thuộc vòng
  if (!req.url.includes('http://localhost:8080/realms/my-auth-realm')) {
    const authService = inject(AuthService);
    const router = inject(Router);

    return next(req).pipe(
      catchError((error) => {
        if(error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            return from(authService.refreshToken()).pipe(
              switchMap(() => {
                const newToken = authService.getAccessToken();
                const retryReq = req.clone({
                  setHeaders: { Authorization: `Bearer ${newToken}` },
                });
                
                return next(retryReq);
              }),

              catchError(() => {
                console.error('Refresh token fail. Đang logout...');
                authService.logOut();
                router.navigate(['logout'])
                return EMPTY;
              })
            );
          }
        }

        return throwError(() => error);
      })
    );
  }

  return next(req);
};
