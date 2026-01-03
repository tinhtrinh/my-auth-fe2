import { Injectable } from "@angular/core";
import { RealTimeService } from "./real-time.service.abstract";
import * as signalR from '@microsoft/signalr';

@Injectable({ providedIn: 'root' })
export class SignalRService implements RealTimeService {
  protected hubConnection?: signalR.HubConnection;
  protected connectionId?: string;
  protected readonly URL = 'http://localhost:5190/realTimeHub';

  start(token?: string | null) : Promise<void> | undefined {
    if (this.hubConnection?.state === signalR.HubConnectionState.Connected) return;

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.URL, {
        accessTokenFactory: token ? () => token : undefined
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000])
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.registerCoreHandlers();

    this.hubConnection.on('ReceiveConnectionId', (id: string) => { 
      this.connectionId = id; console.log('ConnectionId received:', id); }
    );

    return this.hubConnection
      .start()
      .then(() => console.log('SignalR connected'))
      .catch(err => console.error('SignalR connect error:', err));
  }

  stop() : Promise<void> | undefined {
    return this.hubConnection?.stop();
  }

  on<T>(eventName: string, handler: (data: T) => void) : void {
    this.hubConnection?.on(eventName, (payload: T) => {
      handler(payload);
    });
  }

  off(eventName: string) : void {
    this.hubConnection?.off(eventName);
  }

  // Gửi message lên server (gọi method trên Hub)
  invoke<T = any>(methodName: string, ...args: any[]) : Promise<T> | undefined {
    return this.hubConnection?.invoke<T>(methodName, ...args);
  }

  getConnectionId(): string | undefined { 
    return this.connectionId; 
  }

  protected registerCoreHandlers() : void {
    if (!this.hubConnection) return;

    this.hubConnection.onreconnecting(error => {
      console.warn('SignalR reconnecting...', error);
    });

    this.hubConnection.onreconnected(connectionId => {
      console.log('SignalR reconnected:', connectionId);
    });

    this.hubConnection.onclose(error => {
      console.warn('SignalR closed:', error);
    });
  }

  protected receiveConnectionId() : void {
    if (!this.hubConnection) return;

    this.hubConnection.on('ReceiveConnectionId', (id: string) => { 
      this.connectionId = id; console.log('ConnectionId received:', id); }
    );
  }
}


// phiên bản nâng cấp cho tương lai
// @Injectable({ providedIn: 'root' })
// export class SignalRService1 {
//   private hubConnection?: signalR.HubConnection;

//   // Ví dụ: publish state bằng callback; có thể dùng RxJS Subject tùy nhu cầu
//   private listeners: Record<string, ((data: any) => void)[]> = {};

//   private connectionId?: string;

//   start(token?: string) : Promise<void> | undefined {
//     if (this.hubConnection?.state === signalR.HubConnectionState.Connected) return;

//     this.hubConnection = new signalR.HubConnectionBuilder()
//       .withUrl('http://localhost:5190/realTimeHub', {
//         accessTokenFactory: token ? () => token : undefined,
//         withCredentials: false
//       })
//       .withAutomaticReconnect([0, 2000, 5000, 10000]) // backoff
//       .configureLogging(signalR.LogLevel.Information)
//       .build();

//     this.registerCoreHandlers();

//     this.hubConnection.on('ReceiveConnectionId', (id: string) => { 
//       this.connectionId = id; console.log('ConnectionId received:', id); }
//     );

//     return this.hubConnection
//       .start()
//       .then(() => console.log('SignalR connected'))
//       .catch(err => console.error('SignalR connect error:', err));
//   }

//   stop() : Promise<void> | undefined {
//     return this.hubConnection?.stop();
//   }

//   on<T>(eventName: string, handler: (data: T) => void) {
//     // Đăng ký handler phía FE
//     this.listeners[eventName] ??= [];
//     this.listeners[eventName].push(handler);

//     // Đăng ký với hub nếu chưa
//     this.hubConnection?.on(eventName, (payload: T) => {
//       this.listeners[eventName]?.forEach(h => h(payload));
//     });
//   }

//   off(eventName: string, handler?: (data: any) => void) {
//     if (handler) {
//       this.listeners[eventName] = (this.listeners[eventName] ?? []).filter(h => h !== handler);
//     } else {
//       this.listeners[eventName] = [];
//     }
//     // Optional: this.hubConnection?.off(eventName);
//   }

//   // Gửi message lên server (gọi method trên Hub)
//   invoke<T = any>(methodName: string, ...args: any[]) {
//     return this.hubConnection?.invoke<T>(methodName, ...args);
//   }

//   getConnectionId(): string | undefined { 
//     return this.connectionId; 
//   }

//   private registerCoreHandlers() {
//     if (!this.hubConnection) return;

//     this.hubConnection.onreconnecting(error => {
//       console.warn('SignalR reconnecting...', error);
//     });

//     this.hubConnection.onreconnected(connectionId => {
//       console.log('SignalR reconnected:', connectionId);
//     });

//     this.hubConnection.onclose(error => {
//       console.warn('SignalR closed:', error);
//     });
//   }
// }
