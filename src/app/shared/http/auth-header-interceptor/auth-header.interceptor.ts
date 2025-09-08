import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../auth/auth-service/auth.service.abstract';
import { inject } from '@angular/core';
import { throwError, from, switchMap, catchError, EMPTY } from 'rxjs';
import { Router } from '@angular/router';

export const SkipAuthHeader = new HttpContextToken<boolean>(() => false);

export const authHeaderInterceptor: HttpInterceptorFn = (req, next) => {

  if(req.context.get(SkipAuthHeader)) {
    return next(req);
  }

  if (req.url.includes('http://localhost:8080/realms/my-auth-realm')) {
    return next(req);
  }

  // điều kiện để không bị phụ thuộc vòng
  if (!req.url.includes('http://localhost:8080/realms/my-auth-realm')) {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Nếu access token hợp lệ, gửi ngay
    if (authService.hasValidAccessToken()) {
      const accessToken = authService.getAccessToken();
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` },
      });
      return next(authReq);
    }

    // Nếu refresh token không hợp lệ, logout và chặn request
    if (!authService.hasValidRefreshToken()) {
      console.error('Access & Refresh token đều không hợp lệ. Đang logout...');
      authService.logOut();
      router.navigate(['logout']);
    }

    // Nếu có refresh token, gọi refreshToken() (Promise → Observable)
    return from(authService.refreshToken()).pipe(
      switchMap(() => {
        // Sau khi refresh, kiểm tra lại access token
        if (authService.hasValidAccessToken()) {
          const newAccessToken = authService.getAccessToken();
          const refreshedReq = req.clone({
            setHeaders: { Authorization: `Bearer ${newAccessToken}` },
          });
          return next(refreshedReq);
        } else {
          console.error('Access token vẫn không hợp lệ sau khi refresh. Đang logout...');
          authService.logOut();
          router.navigate(['logout']);
          return EMPTY;
        }
      }),
      
      catchError((error) => {
        console.error('Refresh token thất bại:', error);
        authService.logOut();
        router.navigate(['logout']);
        return EMPTY;
      })
    );
  }

  return next(req);
};

// export const authHeaderInterceptor: HttpInterceptorFn = (req, next) => {

//   // if (!req.url.includes('.well-known/openid-configuration')) { 
//   if (!req.url.includes('http://localhost:8080/realms/my-auth-realm')) { 
//   const authService = inject(AuthService);
//   const accessToken = authService.getAccessToken();

//   const authReq = accessToken
//     ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
//     : req;
//   return next(authReq);

//   }
 
//   return next(req);
// };

// if (isOidcExcluded(req.url)) {

// export function wrapWithExclusionCheck(interceptor: HttpInterceptorFn): HttpInterceptorFn {
//   return (req, next) => {
//     if (isOidcExcluded(req.url)) {
//       return next(req);
//     }
//     return interceptor(req, next);
//   };
// }