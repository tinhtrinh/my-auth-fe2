import { HttpClient, HttpContext } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/auth-service/auth.service.abstract";
import { HttpService } from "./http.service.abstract";
import { HAS_AUTH_HEADER } from "../auth-header-interceptor/auth-header.interceptor";
import { HAS_UNAUTHORIZED_ERROR_HANDLER } from "../unauthorized-error-interceptor/unauthorized-error.interceptor";
import { HAS_FORBIDDEN_ERROR_HANDLER } from "../forbidden-error-interceptor/forbidden-error.interceptor";

@Injectable({
  providedIn: 'root'
})
export class DefaultHttpService implements HttpService {
    protected readonly BACKEND_URL = 'http://localhost:5190/api';

    protected httpClient = inject(HttpClient);
    protected authService = inject(AuthService);

    get(url: string): Observable<any> {
        return this.httpClient.get(
            `${this.BACKEND_URL}/${url}`, 
            {
                context: new HttpContext()
                    .set(HAS_AUTH_HEADER, true)
                    .set(HAS_UNAUTHORIZED_ERROR_HANDLER, true)
                    .set(HAS_FORBIDDEN_ERROR_HANDLER, true)
            }
        ) 
    }
}