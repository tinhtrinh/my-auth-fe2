import { Injectable } from "@angular/core";
import { II18nService } from "./i18n.interface";
import { TranslocoService } from "@jsverse/transloco";

@Injectable({ providedIn: 'root' })
export class TranslocoI18nService extends TranslocoService implements II18nService {

}