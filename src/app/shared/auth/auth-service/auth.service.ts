import { inject, Injectable, NgZone } from '@angular/core';
import { AuthService } from './auth.service.abstract';
import { AuthConfig, OAuthService, OAuthStorage } from 'angular-oauth2-oidc';

export const DefaultAuthCodeFlowConfig : AuthConfig  = {
  issuer: 'http://localhost:8080/realms/my-auth-realm',
  redirectUri: window.location.origin + '/auth-callback',
  clientId: 'my-auth-client',
  responseType: 'code',
  scope: 'openid profile email offline_access',
  showDebugInformation: true,
  requireHttps: false
}

@Injectable({
  providedIn: 'root'
})
export class DefaultAuthService implements AuthService {
  private readonly oauthService = inject(OAuthService);

  constructor() {
    this.oauthService.configure(DefaultAuthCodeFlowConfig);
    this.oauthService.loadDiscoveryDocument();
  }

  hasValidAccessToken(): boolean {
    const expiresAt = this.oauthService.getAccessTokenExpiration();
    const now = new Date().getTime();
    const isValid = expiresAt > now;
    return isValid;
  }

  hasValidRefreshToken(): boolean {
    return !!this.oauthService.getRefreshToken();
  }

  getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }

  login() : void {
    if (!this.oauthService.clientId || !this.oauthService.issuer) {
      console.warn('OAuth cấu hình chưa đầy đủ');
      return;
    }
  
    try {
      this.oauthService.initCodeFlow();
    } catch (err) {
      console.error('Lỗi khi gọi initCodeFlow:', err);
      throw err;
    }
  }

  async tryLogin(): Promise<any> {
    try {
      await this.oauthService.loadDiscoveryDocumentAndTryLogin();
    } catch (error) {
      console.error('Try login failed:', error);
      throw error;
    }
  }

  async refreshToken(): Promise<any> {
    try {
      const result = await this.oauthService.refreshToken();
      return result;
    } catch (error) {
      console.error('Refresh token failed:', error);
      throw error; // hoặc return null nếu bạn muốn xử lý mềm hơn
    }
  }

  logOut(): void {
    if (!this.oauthService.clientId || !this.oauthService.issuer) {
      console.warn('OAuth cấu hình chưa đầy đủ');
      return;
    }
  
    try {
      this.oauthService.logOut(true);
    } catch (err) {
      console.error('Lỗi khi gọi logout:', err);
    }
  }
}
