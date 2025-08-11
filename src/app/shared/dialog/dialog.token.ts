import { InjectionToken } from "@angular/core";
import { IDialogOptions, IDialogRef, IDialogService } from "./dialog.interface";

export const DIALOG_SERVICE_TOKEN = new InjectionToken<IDialogService>('DIALOG_SERVICE_TOKEN');

export const DIALOG_REF_TOKEN = new InjectionToken<IDialogRef>('DIALOG_REF_TOKEN');

export const DIALOG_DEFAULT_OPTIONS_TOKEN = new InjectionToken<IDialogOptions>('DIALOG_DEFAULT_OPTIONS_TOKEN');

export const DIALOG_DATA_TOKEN = new InjectionToken<any>('DIALOG_DATA_TOKEN');