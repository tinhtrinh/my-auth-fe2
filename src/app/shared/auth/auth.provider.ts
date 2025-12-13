import { EnvironmentProviders, makeEnvironmentProviders, Provider } from "@angular/core";
import { AuthService } from "./auth-service/auth.service.abstract";
import { DefaultAuthService } from "./auth-service/default-auth.service";

export function provideAuth(): Provider[] {
  return [
    {
      provide: AuthService,
      useClass: DefaultAuthService
    }
  ]
}