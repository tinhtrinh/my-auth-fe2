import { Component, inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";
import { TOAST_DATA } from "../toast.token";
import { ToastRef } from "../toast-service/toast.ref.abstract";
import { MatToastRef } from "../toast-service/mat-toast.ref";
import { TranslocoI18nPipe } from "../../i18n/transloco-i18n.pipe";

export const TOAST_DEFAULT_OPTIONS = {
  duration: 5000,
  horizontalPosition: 'center',
  verticalPosition: 'top'
}

export const TOAST_BASE_IMPORTS = [
  TranslocoI18nPipe
]

export const TOAST_BASE_PROVIDERS = [
  {
    provide: TOAST_DATA,
    useExisting: MAT_SNACK_BAR_DATA
  },
  {
    provide: ToastRef,
    useClass: MatToastRef
  }
]

@Component({
  selector: 'app-toast-base',
  imports: TOAST_BASE_IMPORTS,
  template: '',
  styles: '',
  providers: TOAST_BASE_PROVIDERS
})
export abstract class ToastComponentBase {
  protected toastData = inject(TOAST_DATA);

  protected toastRef = inject(ToastRef);

  message = this.toastData;

  dismiss(): void {
    this.toastRef.dismiss();
  }
}