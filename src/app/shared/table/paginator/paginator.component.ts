import { Component, EventEmitter, Injectable, Input, Output } from '@angular/core';
import {PageEvent, MatPaginatorModule, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';

@Injectable()
export class PaginatorIntl extends MatPaginatorIntl {
  override getRangeLabel = () => '';
}

@Component({
  selector: 'app-paginator',
  imports: [
    MatPaginatorModule,
    MatSelectModule
  ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  providers: [{provide: MatPaginatorIntl, useClass: PaginatorIntl}]
})
export class PaginatorComponent {
  @Input() length = 0;
  @Input() pageSize = 10;
  @Input() pageIndex = 0;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];
 
  @Output() pageChange = new EventEmitter<PageEvent>();
 
  startIndex =  this.pageIndex * this.pageSize + 1;
  endIndex = (this.pageIndex + 1) * this.pageSize;
 
  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.startIndex =  this.pageIndex * this.pageSize + 1;
    this.endIndex = (this.pageIndex + 1) * this.pageSize;
    this.pageChange.emit(event);
  }
 
  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.pageIndex = 0;
   
    const pageEvent: PageEvent = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length
    }
 
    this.onPageChange(pageEvent);
  }
}