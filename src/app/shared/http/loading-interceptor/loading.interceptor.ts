import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../../loading/loading-service/loading.service.abstract';

export const SkipLoading = new HttpContextToken<boolean>(() => false);

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  if(req.context.get(SkipLoading)) {
    return next(req);
  }

  const loadingService = inject(LoadingService)
  loadingService.loadingOn();
  
  return next(req).pipe(
    finalize(() => {
      loadingService.loadingOff();
    })
  );
};
