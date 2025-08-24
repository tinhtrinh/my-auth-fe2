import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { EnvironmentProviders } from "@angular/core";
import { internalServerErrorInterceptor } from "./internal-server-error-interceptor/internal-server-error.interceptor";
import { networkErrorInterceptor } from "./network-error-interceptor/network-error.interceptor";
import { unknownErrorInterceptor } from "./unknown-error-interceptor/unknown-error.interceptor";
import { loadingInterceptor } from "./loading-interceptor/loading.interceptor";

export function provideMyAuthHttpClient(): EnvironmentProviders {
   return provideHttpClient(
    withInterceptors([
        loadingInterceptor,
        unknownErrorInterceptor,
        internalServerErrorInterceptor,
        networkErrorInterceptor
    ])
   );
}

/* Thứ tự interceptor:
+ luồng request: cái ở trước thì chạy trước
+ luồng response: cái ở sau thì chạy trước*/
