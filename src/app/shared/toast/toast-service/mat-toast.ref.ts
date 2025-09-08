import { inject } from "@angular/core";
import { ToastRef } from "../toast-service/toast.ref.abstract";
import { MatSnackBarRef } from "@angular/material/snack-bar";

export class MatToastRef implements ToastRef {
    private snackBarRef = inject(MatSnackBarRef);

    dismiss(): void {
        this.snackBarRef.dismiss();
    }
}