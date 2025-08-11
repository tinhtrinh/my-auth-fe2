import { inject, Injectable } from "@angular/core";
import { IDialogOptions, IDialogRef, IDialogService } from "./dialog.interface";
import { Observable } from "rxjs";
import { Dialog, DialogRef } from "@angular/cdk/dialog";

@Injectable({ providedIn: 'root' })
export class MatDialogService implements IDialogService {
  
  private dialog = inject(Dialog);

  open(component: any, options?: IDialogOptions): IDialogRef {
    const ref = this.dialog.open(component, options);

    const dialogRef: IDialogRef = {
      close: (result?: any) => ref.close(result),
      closed: () => ref.closed
    }

    return dialogRef;
  }
}

export class MyMatDialogRef implements IDialogRef {
  
  private dialogRef = inject(DialogRef);

  close(result?: any): void {
    this.dialogRef.close(result);
  }

  closed(): Observable<any> {
    return this.dialogRef.closed;
  }
}