import { isDevMode, Provider } from "@angular/core";
import { provideTransloco } from "@jsverse/transloco";
import { TranslocoHttpLoader } from "../../transloco-loader";
import { I18N_SERVICE_TOKEN } from "./i18n.token";
import { TranslocoI18nService } from "./transloco-i18n.service";

export function provideI18n(): Provider[] {
  return [
    provideTransloco({
        config: { 
          availableLangs: ['en'],
          defaultLang: 'en',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
    }),
    {
      provide: I18N_SERVICE_TOKEN,
      useClass: TranslocoI18nService
    },
  ]
}