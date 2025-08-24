import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoI18nPipe } from './shared/i18n/transloco-i18n.pipe';
import { DIALOG_SERVICE_TOKEN } from './shared/dialog/dialog.token';
import {MatButton} from '@angular/material/button';
import { DIALOG_BASE_IMPORTS, DIALOG_BASE_PROVIDERS, DialogBase } from './shared/dialog/dialog-base.component';
import { HttpClient } from '@angular/common/http';
import { LoadingIndicatorComponent } from './shared/loading/loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    // RouterOutlet,
    TranslocoI18nPipe,
    MatButton,
    LoadingIndicatorComponent
  ],
})
export class AppComponent {
  title = 'my-auth-fe2';
  myDialogData = signal('My Dialog Data');
  private dialogService = inject(DIALOG_SERVICE_TOKEN);
  private httpClient = inject(HttpClient);

  openMyDialog(): void {
    this.httpClient.get('http://localhost:4201/error-api').subscribe();
    
    const dialogRef = this.dialogService.open(
      MyDialogComponent,
      { data: this.myDialogData() }
    );

    dialogRef.closed().subscribe((res) => {
      this.myDialogData.set(res);
    })
  }
}


@Component({
  selector: 'app-my-dialog',
  template: `
    <div>
      <h1>{{ title | i18n }}</h1>
      <h2>{{ data }}</h2>
      <button mat-button (click)="onSubmit()">Open My Dialog</button>
    </div>
  `,
  styleUrl: './app.component.scss',
  standalone: true,
  imports: DIALOG_BASE_IMPORTS,
  providers: DIALOG_BASE_PROVIDERS
})
export class MyDialogComponent extends DialogBase {
  override title = 'myDialog.title';

  data = this.dialogData;

  onSubmit(): void {
    this.dialogRef.close(this.data + ' submit');
  }
}