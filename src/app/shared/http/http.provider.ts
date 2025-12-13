import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { internalServerErrorInterceptor } from "./internal-server-error-interceptor/internal-server-error.interceptor";
import { networkErrorInterceptor } from "./network-error-interceptor/network-error.interceptor";
import { unknownErrorInterceptor } from "./unknown-error-interceptor/unknown-error.interceptor";
import { loadingInterceptor } from "./loading-interceptor/loading.interceptor";
import { unauthorizedErrorInterceptor } from "./unauthorized-error-interceptor/unauthorized-error.interceptor";
import { authHeaderInterceptor } from "./auth-header-interceptor/auth-header.interceptor";
import { HttpService } from "./http-service/http.service.abstract";
import { DefaultHttpService } from "./http-service/default-http.service";

export function provideMyAuthHttpClient(): EnvironmentProviders {
   return makeEnvironmentProviders([
        provideHttpClient(
            withInterceptors([
                loadingInterceptor,
                authHeaderInterceptor,
                unknownErrorInterceptor,
                unauthorizedErrorInterceptor,
                internalServerErrorInterceptor,
                networkErrorInterceptor
            ])
        ),
        {
            provide: HttpService,
            useClass: DefaultHttpService
        }
    ]);
}

/* Thứ tự interceptor:
+ luồng request: cái ở trước thì chạy trước
+ luồng response: cái ở sau thì chạy trước*/

// 3 cái cần test: auth header, 401, auth guard