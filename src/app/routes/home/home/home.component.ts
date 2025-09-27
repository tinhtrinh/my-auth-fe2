import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { DIALOG_BASE_IMPORTS, DIALOG_BASE_PROVIDERS, DialogBase } from '../../../shared/dialog/dialog-base.component';
import { DIALOG_SERVICE_TOKEN } from '../../../shared/dialog/dialog.token';
import { TranslocoI18nPipe } from '../../../shared/i18n/transloco-i18n.pipe';
import { LoadingIndicatorComponent } from '../../../shared/loading/loading-indicator/loading-indicator.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { TabGroupComponent } from '../../../shared/tab/tab-group/tab-group.component';
import { TabComponent } from '../../../shared/tab/tab/tab.component';

@Component({
  selector: 'app-home',
  imports: [
    TranslocoI18nPipe,
    MatButton,
    LoadingIndicatorComponent,
    MatTabsModule,
    MatMenuModule,
    TabGroupComponent,
    TabComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'my-auth-fe2';
  myDialogData = signal('My Dialog Data');
  private dialogService = inject(DIALOG_SERVICE_TOKEN);
  private httpClient = inject(HttpClient);

  tabs = Array.from({ length: 100 }, (_, i) => {
    if(i == 10) {
      return {
      id: i.toString(),
      label: `label ${i + 1} with long label to test overflow`,
      content: `content ${i + 1}`
    }
    }

    return {
      id: i.toString(),
      label: `label ${i + 1}`,
      content: `content ${i + 1}`
    }
  });

  openMyDialog(): void {
    this.httpClient.get('http://localhost:5190/api/users').subscribe();
    
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
  styleUrl: './home.component.scss',
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