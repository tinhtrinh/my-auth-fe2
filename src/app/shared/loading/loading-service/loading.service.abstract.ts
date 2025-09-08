import { Observable } from "rxjs";

export abstract class LoadingService {
    abstract loading$: Observable<boolean>;
    abstract loadingOn(): void;
    abstract loadingOff(): void;
}