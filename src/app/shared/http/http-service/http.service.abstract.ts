import { Observable } from "rxjs";

export abstract class HttpService {
    abstract get(url: string): Observable<any>
}