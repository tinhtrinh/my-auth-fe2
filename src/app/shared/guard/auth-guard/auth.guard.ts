import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError } from 'rxjs';
import { AuthService } from '../../auth/auth-service/auth.service.abstract';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Nếu token hợp lệ → cho phép truy cập
  if (authService.hasValidAccessToken()) {
    return true;
  }

  // Thử refresh token bằng RxJS
  return authService.refreshToken().pipe(
    map(() => {
      if (authService.hasValidAccessToken()) {
        return true;
      }

      console.error('AuthGuard refresh invalid. Logout...');
      authService.logOut();
      return router.createUrlTree(['/logout']);
    }),

    catchError(() => {
      console.error('AuthGuard refresh fail. Logout...');
      authService.logOut();
      return router.navigate(['/logout']);
    })
  );
};


// hoặc ép đăng nhập để kiểm tra có vào được url hay ko
// hoặc redirect qua trang logout, phải redirect thủ công vì logOut() ko có redirect
// khi refresh lỗi thì logout và chuyển đến trang logout