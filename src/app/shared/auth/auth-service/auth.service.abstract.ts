export abstract class AuthService {
    abstract hasValidAccessToken(): boolean;
    abstract hasValidRefreshToken(): boolean;
    abstract getAccessToken(): string;
    abstract login(): void;
    abstract tryLogin(): Promise<any>
    abstract refreshToken(): Promise<any>;
    abstract logOut(): void;
}