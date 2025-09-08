import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { provideOAuthClient } from "angular-oauth2-oidc";
import { AuthService } from "./auth-service/auth.service.abstract";
import { DefaultAuthService } from "./auth-service/auth.service";

export function provideAuth(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideOAuthClient(),
    {
      provide: AuthService,
      useClass: DefaultAuthService
    }
  ])
}