import { HttpContextToken, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, EMPTY, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth-service/auth.service.abstract';
import { Router } from '@angular/router';

export const HAS_UNAUTHORIZED_ERROR_HANDLER = new HttpContextToken<boolean>(() => false);

export const unauthorizedErrorInterceptor: HttpInterceptorFn = (req, next) => {

  if (!req.context.get(HAS_UNAUTHORIZED_ERROR_HANDLER)) {
    return next(req);
  }

  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          return authService.refreshToken().pipe(
            switchMap(() => {
              if (!authService.hasValidAccessToken()) {
                console.error('UnauthorizedErrorInterceptor refresh invalid. Logout...');
                authService.logOut();
                router.navigate(['logout']);
                return EMPTY;
              }

              const newToken = authService.getAccessToken();
              const retryReq = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` },
              });

              return next(retryReq);
            }),

            catchError(() => {
              console.error('UnauthorizedErrorInterceptor refresh fail. Logout...');
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
};
