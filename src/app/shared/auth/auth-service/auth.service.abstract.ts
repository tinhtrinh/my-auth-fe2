import { Observable } from "rxjs";

export interface TokenResponse {
    accessToken: string;
    expiresInUtc: string;
}

export abstract class AuthService {
    abstract hasValidAccessToken(): boolean;
    abstract getAccessToken(): string | null;
    abstract login(): void;
    abstract refreshToken(): Observable<TokenResponse>;
    abstract logOut(): void;
    abstract handleLoginCallback(): void;
}