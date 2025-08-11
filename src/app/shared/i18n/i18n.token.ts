import { InjectionToken } from "@angular/core";
import { II18nService } from "./i18n.interface";

export const I18N_SERVICE_TOKEN = new InjectionToken<II18nService>('I18N_SERVICE_TOKEN');