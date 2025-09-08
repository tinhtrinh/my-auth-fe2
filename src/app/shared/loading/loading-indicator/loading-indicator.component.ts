import { Component, inject } from '@angular/core';
import { LoadingService } from '../loading-service/loading.service.abstract';
import { MatProgressSpinnerModule  } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loading-indicator',
  imports: [ 
    MatProgressSpinnerModule,
    AsyncPipe
  ],
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.scss'
})
export class LoadingIndicatorComponent {

  private loadingService = inject(LoadingService);

  loading = this.loadingService.loading$;
}
