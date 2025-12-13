import { inject, Injectable } from '@angular/core';
import { AuthService, TokenResponse } from './auth.service.abstract';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DefaultAuthService implements AuthService {
  protected accessToken: string | null = null;
  protected expiresInUtc: Date | null = null;
  protected readonly BACKEND_URL = 'http://localhost:5190/api';

  protected router = inject(Router);
  protected http = inject(HttpClient);

  hasValidAccessToken(): boolean {
    if(!this.accessToken) return false;

    if(!this.expiresInUtc) return false;

    const now = new Date()
    const isExpired = now >= this.expiresInUtc;
    return !isExpired;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  login() : void {
    window.location.assign('http://localhost:5190/api/auth/login');
  }
 
  refreshToken() : Observable<TokenResponse> {
    return this.http.post<TokenResponse>(
      `${this.BACKEND_URL}/auth/refresh`,
      {},
      { withCredentials: true }
    ).pipe(
      tap((res) => {
        this.accessToken = res.accessToken ?? null;
        this.expiresInUtc = res.expiresInUtc ? new Date(res.expiresInUtc) : null;
      })
    );
  }

  logOut(): void {
    this.router.navigate(['logout']);
    this.accessToken = null;
    this.expiresInUtc = null;
    this.http.post(
      `${this.BACKEND_URL}/auth/logout`,
      {},
      { withCredentials: true }
    ).subscribe();
  }

  handleLoginCallback() {
    // 1️⃣ Lấy phần fragment trong URL (phần sau dấu #)
    const hash = window.location.hash.substring(1);
    // ví dụ: "access_token=eyJhbGciOi..."
  
    // 2️⃣ Parse nó thành các cặp key-value
    const params = new URLSearchParams(hash);
    this.accessToken = params.get('access_token');
    const expiresInUtcValue = params.get('expires_in_utc');
    this.expiresInUtc = expiresInUtcValue ? new Date(expiresInUtcValue) : null;

    // 4️⃣ Xóa fragment khỏi URL để tránh lộ token trong history
    window.history.replaceState({}, document.title, this.router.url.split('#')[0]);
  }
}
