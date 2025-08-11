import { Provider } from "@angular/core";
import { DIALOG_SERVICE_TOKEN } from "./dialog.token";
import { MatDialogService } from "./dialog.implementation";
import { DEFAULT_DIALOG_CONFIG } from "@angular/cdk/dialog";
import { DEFAULT_DIALOG_BASE_CONFIG } from "./dialog-base.component";

export function provideDialog(): Provider[] {
  return [
    {
      provide: DIALOG_SERVICE_TOKEN,
      useClass: MatDialogService
    },
    {
      provide: DEFAULT_DIALOG_CONFIG,
      useValue: DEFAULT_DIALOG_BASE_CONFIG
    }
  ]
}