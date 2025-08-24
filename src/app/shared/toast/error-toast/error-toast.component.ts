import { Component } from '@angular/core';
import { TOAST_BASE_IMPORTS, TOAST_BASE_PROVIDERS, ToastComponentBase } from '../toast-base/toast.component.base';

@Component({
  selector: 'app-error-toast',
  imports: TOAST_BASE_IMPORTS,
  templateUrl: './error-toast.component.html',
  styleUrls: ['./error-toast.component.scss', '../toast-base/toast.component.base.scss'],
  providers: TOAST_BASE_PROVIDERS
})
export class ErrorToastComponent extends ToastComponentBase {
  
}
