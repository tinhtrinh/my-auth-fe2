import { inject, Injectable } from "@angular/core";
import { Translation, TranslocoLoader } from "@jsverse/transloco";
import { HttpClient, HttpContext } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
    private http = inject(HttpClient);

    getTranslation(lang: string) {
        // return this.http.get<Translation>(`${environment.baseUrl}/assets/i18n/${lang}.json`);
        return this.http.get<Translation>(`/assets/i18n/en.json`);
    }
}
