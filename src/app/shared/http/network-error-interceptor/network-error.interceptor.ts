import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, EMPTY, throwError } from 'rxjs';
import { ToastService } from '../../toast/toast-service/toast.service.abstract';
import { ErrorToastComponent } from '../../toast/error-toast/error-toast.component';

export const networkErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 0) {
          toastService.openFromComponent(
            ErrorToastComponent,
            { data: 'http.networkError' }
          );

          return EMPTY;
        }
      }

      return throwError(() => error);
    })
  );
};
