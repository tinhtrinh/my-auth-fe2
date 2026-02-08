import { HttpContextToken, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../toast/toast-service/toast.service.abstract';
import { ErrorToastComponent } from '../../toast/error-toast/error-toast.component';

export const HAS_FORBIDDEN_ERROR_HANDLER = new HttpContextToken<boolean>(() => false);

export const forbiddenErrorInterceptor: HttpInterceptorFn = (req, next) => {

  if (!req.context.get(HAS_FORBIDDEN_ERROR_HANDLER)) {
    return next(req);
  }

  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 403) {
          toastService.openFromComponent(
            ErrorToastComponent,
            { data: error.error.message }
          );
        }
      }

      return throwError(() => error);
    })
  );
};
