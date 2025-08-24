import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, EMPTY, throwError } from 'rxjs';
import { ErrorToastComponent } from '../../toast/error-toast/error-toast.component';
import { ToastService } from '../../toast/toast-service/toast.service.abstract';

export const unknownErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error) => {
      if (!(error instanceof HttpErrorResponse)) {
        toastService.openFromComponent(
          ErrorToastComponent,
          { data: 'http.unknownError' }
        );

        return EMPTY;
      }

      return throwError(() => error);
    })
  );
};
