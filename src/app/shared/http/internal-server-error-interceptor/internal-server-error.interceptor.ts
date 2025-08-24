import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, EMPTY, throwError } from 'rxjs';
import { ToastService } from '../../toast/toast-service/toast.service.abstract';
import { ErrorToastComponent } from '../../toast/error-toast/error-toast.component';

export const internalServerErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 500) {
        toastService.openFromComponent(
          ErrorToastComponent,
          { data: 'http.internalServerError' }
        );
        
        return EMPTY;
      }

      return throwError(() => error);
    })
  )
};
