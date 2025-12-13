import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../auth/auth-service/auth.service.abstract';
import { inject } from '@angular/core';
import { switchMap, catchError, EMPTY } from 'rxjs';
import { Router } from '@angular/router';

export const HAS_AUTH_HEADER = new HttpContextToken<boolean>(() => false);

export const authHeaderInterceptor: HttpInterceptorFn = (req, next) => {

  if(!req.context.get(HAS_AUTH_HEADER)) {
    return next(req);
  }

  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.hasValidAccessToken()) {
    return authService.refreshToken().pipe(
      switchMap(() => {
        // Sau khi refresh, kiểm tra lại access token
        if (!authService.hasValidAccessToken()) {
          console.error('AuthHeaderInterceptor refresh invalid. Logout...');
          authService.logOut();
          router.navigate(['logout']);
          return EMPTY;
        }

        const newAccessToken = authService.getAccessToken();
        const refreshedReq = req.clone({
          setHeaders: { Authorization: `Bearer ${newAccessToken}` },
        });
        return next(refreshedReq);
      }),
      
      catchError((error) => {
        console.error('AuthHeaderInterceptor refresh fail:', error);
        authService.logOut();
        router.navigate(['logout']);
        return EMPTY;
      })
    );
  }

  const accessToken = authService.getAccessToken();
  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${accessToken}` },
  });
  return next(authReq);
};