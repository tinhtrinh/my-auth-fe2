import { Provider } from "@angular/core";
import { RealTimeService } from "./real-time-service/real-time.service.abstract";
import { SignalRService } from "./real-time-service/signalR.service";

export function provideRealTime(): Provider[] {
  return [
    {
      provide: RealTimeService,
      useClass: SignalRService
    }
  ]
}