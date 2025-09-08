import { inject, Injectable } from '@angular/core';
import { ToastService } from './toast.service.abstract';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentType } from '@angular/cdk/portal';
import { ToastRef } from './toast.ref.abstract';

@Injectable({
  providedIn: 'root'
})
export class MatToastService implements ToastService {
  
  private snackBar = inject(MatSnackBar);

  openFromComponent(component: ComponentType<any>, option?: any): ToastRef {
    const ref = this.snackBar.openFromComponent(component, option);

    const toastRef: ToastRef = {
      dismiss: () => ref.dismiss()
    }

    return toastRef;
  }
}
