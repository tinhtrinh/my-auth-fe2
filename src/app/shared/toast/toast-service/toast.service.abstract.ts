import { ComponentType } from "@angular/cdk/portal";
import { ToastRef } from "./toast.ref.abstract";

export abstract class ToastService {
    abstract openFromComponent(
        component: ComponentType<any>, 
        option?: any
    ): ToastRef
}