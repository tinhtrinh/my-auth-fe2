import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of, from, map, switchMap, catchError } from 'rxjs';
import { AuthService } from '../../auth/auth-service/auth.service.abstract';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
 
  // Nếu token hợp lệ → cho phép truy cập
  if (authService.hasValidAccessToken()) {
    return of(true);
  }

  if(!authService.hasValidRefreshToken()) {
    authService.logOut();
    return router.navigate(['/logout']);
  }
 
  // Thử refresh token bằng RxJS
  return from(authService.refreshToken()).pipe(
    map(() => authService.hasValidAccessToken()),

    switchMap((isValid) => {
      if (isValid) {
        return of(true);
      } else {
        authService.logOut();
        return router.navigate(['/logout']);
      }
    }),

    catchError(() => {
      authService.logOut();
      return router.navigate(['/logout']);;
    })
  );
};


// hoặc ép đăng nhập để kiểm tra có vào được url hay ko
// hoặc redirect qua trang logout, phải redirect thủ công vì logOut() ko có redirect
// khi refresh lỗi thì logout và chuyển đến trang logout