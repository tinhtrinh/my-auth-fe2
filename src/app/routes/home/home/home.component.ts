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
import { SortableHeaderDirective, SortDirection } from '../../../shared/table/sortable-header-directive/sortable-header.directive';
import { ResizableHeaderDirective } from '../../../shared/table/resizable-header-directive/resizable-header.directive';
import { PaginatorComponent } from '../../../shared/table/paginator/paginator.component';
import { ExpansionPanelComponent } from '../../../shared/expansion-panel/expansion-panel.component';
import { AuthService } from '../../../shared/auth/auth-service/auth.service.abstract';
import { HttpService } from '../../../shared/http/http-service/http.service.abstract';

@Component({
  selector: 'app-home',
  imports: [
    TranslocoI18nPipe,
    MatButton,
    LoadingIndicatorComponent,
    MatTabsModule,
    MatMenuModule,
    TabGroupComponent,
    TabComponent,
    SortableHeaderDirective,
    ResizableHeaderDirective,
    PaginatorComponent,
    ExpansionPanelComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'my-auth-fe2';
  myDialogData = signal('My Dialog Data');
  private dialogService = inject(DIALOG_SERVICE_TOKEN);
  private authService = inject(AuthService);
  private httpService = inject(HttpService);

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

  sortColumnMap: Record<string, SortDirection> = {
    company: '',
    contact: '',
    country: ''
  };

  openMyDialog(): void {
    this.httpService.get('users').subscribe();
    
    const dialogRef = this.dialogService.open(
      MyDialogComponent,
      { data: this.myDialogData() }
    );

    dialogRef.closed().subscribe((res) => {
      this.myDialogData.set(res);
    })
  }

  onSortChange(event: any) {
    Object.keys(this.sortColumnMap).forEach((column: string) => {
      if(column == event.sortColumn) {
        this.sortColumnMap[column] = event.sortDirection
      } else {
        this.sortColumnMap[column] = ''
      }
    })
  }

  onPageChange(event: any): void {
    event;
  }

  onLogout() : void {
    this.authService.logOut();
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