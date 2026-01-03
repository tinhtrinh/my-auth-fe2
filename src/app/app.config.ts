import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideI18n } from './shared/i18n/i18n.provider';
import { provideDialog } from './shared/dialog/dialog.provider';
import { provideMyAuthHttpClient } from './shared/http/http.provider';
import { provideToast } from './shared/toast/toast.provider';
import { provideLoading } from './shared/loading/loading.provider';
import { provideAuth } from './shared/auth/auth.provider';
import { provideRealTime } from './shared/real-time/real-time.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()), 
    provideMyAuthHttpClient(),
    provideI18n(),
    provideDialog(),
    provideToast(),
    provideLoading(),
    provideAuth(),
    provideRealTime()
  ]
};
