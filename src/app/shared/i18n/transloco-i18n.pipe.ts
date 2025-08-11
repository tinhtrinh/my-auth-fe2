import { Pipe } from "@angular/core";
import { TranslocoPipe } from "@jsverse/transloco";

@Pipe({
    name: 'i18n',
    standalone: true,
    pure: false
})
export class TranslocoI18nPipe extends TranslocoPipe {
    
}