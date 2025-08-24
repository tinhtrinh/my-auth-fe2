import { inject } from "@angular/core";
import { ToastRef } from "../toast-service/toast.ref.abstract";
import { MatSnackBarRef } from "@angular/material/snack-bar";

export class MatToastRef extends ToastRef {
    private snackBarRef = inject(MatSnackBarRef);

    override dismiss(): void {
        this.snackBarRef.dismiss();
    }
}