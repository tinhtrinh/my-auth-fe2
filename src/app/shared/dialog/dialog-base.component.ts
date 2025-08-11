import { Component, inject } from "@angular/core";
import { DIALOG_DATA_TOKEN, DIALOG_REF_TOKEN } from "./dialog.token";
import { MatButton } from "@angular/material/button";
import { TranslocoI18nPipe } from "../i18n/transloco-i18n.pipe";
import { MyMatDialogRef } from "./dialog.implementation";
import { DIALOG_DATA } from "@angular/cdk/dialog";

export const DIALOG_BASE_IMPORTS = [
  TranslocoI18nPipe,
  MatButton
]

export const DIALOG_BASE_PROVIDERS = [
  {
    provide: DIALOG_REF_TOKEN,
    useClass: MyMatDialogRef
  },
  {
    provide: DIALOG_DATA_TOKEN,
    useExisting: DIALOG_DATA
  }
]

export const DEFAULT_DIALOG_BASE_CONFIG = {
  hasBackdrop: false
}

@Component({
  selector: 'app-dialog-base',
  template: '',
  styles: '',
  standalone: true,
  imports: DIALOG_BASE_IMPORTS,
  providers: DIALOG_BASE_PROVIDERS
})
export abstract class DialogBase {
  title = '';

  protected dialogRef = inject(DIALOG_REF_TOKEN);
  protected dialogData = inject(DIALOG_DATA_TOKEN);
  
  onCancel(): void {
    this.dialogRef.close();
  }
}