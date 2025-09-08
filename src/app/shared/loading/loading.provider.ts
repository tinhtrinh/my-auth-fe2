import { Provider } from "@angular/core";
import { DefaultLoadingService } from "./loading-service/default-loading.service";
import { LoadingService } from "./loading-service/loading.service.abstract";

export function provideLoading(): Provider[] {
  return [
    {
      provide: LoadingService,
      useClass: DefaultLoadingService
    }
  ]
}