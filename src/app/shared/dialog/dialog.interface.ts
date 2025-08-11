import { Observable } from "rxjs";

export interface IDialogService {
  open(component: any, options?: IDialogOptions) : IDialogRef
}

export interface IDialogRef{
  close(result?: any): void;
  closed(): Observable<any>;
}

export interface IDialogOptions {
  header?: string;
  width?: string;
  data?: any;
  modal?: boolean;
  [key: string]: any; // mở rộng cho từng thư viện
}