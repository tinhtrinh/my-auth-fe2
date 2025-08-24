import { Provider } from "@angular/core";
import { ToastService } from "./toast-service/toast.service.abstract";
import { MatToastService } from "./toast-service/mat-toast.service";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";
import { TOAST_DEFAULT_OPTIONS } from "./toast-base/toast.component.base";

export function provideToast(): Provider[] {
  return [
    {
      provide: ToastService,
      useClass: MatToastService
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: TOAST_DEFAULT_OPTIONS
    }
  ]
}