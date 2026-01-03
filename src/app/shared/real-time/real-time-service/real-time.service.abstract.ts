export abstract class RealTimeService {
    abstract start(token?: string | null) : Promise<void> | undefined;
    abstract stop() : Promise<void> | undefined;
    abstract on<T>(eventName: string, handler: (data: T) => void) : void;
    abstract off(eventName: string) : void;
    abstract invoke<T = any>(methodName: string, ...args: any[]) : Promise<T> | undefined;
    abstract getConnectionId(): string | undefined;
}