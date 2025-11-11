import { Directive, ElementRef, EventEmitter, HostListener, inject, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';

export type SortDirection = 'asc' | 'desc' | '';

@Directive({
  selector: '[appSortableHeader]'
})
export class SortableHeaderDirective implements OnInit, OnChanges {
  @Input({ required: true }) sortColumnName!: string;
  @Input() defaultSortDirection!: SortDirection;
  @Input() sortDirection: SortDirection = '';
  @Output() sortChange = new EventEmitter<{ sortColumn: string; sortDirection: SortDirection }>();
 
  protected readonly ASC_CLASS_NAME = 'sort-icon bi bi-sort-alpha-up';
  protected readonly DESC_CLASS_NAME = 'sort-icon bi bi-sort-alpha-down-alt';
  protected icon: HTMLElement;

  protected el = inject(ElementRef);
  protected renderer = inject(Renderer2);
 
  constructor() {
    this.icon = this.renderer.createElement('i');
  }
 
  ngOnInit(): void {
    this.initSortIcon();
  }
 
  ngOnChanges(changes: SimpleChanges): void {
    this.hideIconWhenNoSort(changes);
  }
 
  initSortIcon(): void {
    this.renderer.setProperty(this.icon, 'className', this.ASC_CLASS_NAME);
    this.renderer.setStyle(this.icon, 'display', 'none');
    this.initDefaultSort();
    this.renderer.appendChild(this.el.nativeElement, this.icon);
    this.renderer.listen(this.icon, 'click', this.onClick.bind(this));
  }
 
  initDefaultSort(): void {
    if(this.defaultSortDirection) {
      this.renderer.setStyle(this.icon, 'display', 'inline-block');
      this.sortDirection = this.defaultSortDirection;
      this.updateIcon();
    }
  }
 
  hideIconWhenNoSort(changes: SimpleChanges): void {
    const isNoSort = changes['sortDirection'] && changes['sortDirection'].currentValue == '';
    if(isNoSort) {
      this.renderer.setStyle(this.icon, 'display', 'none');
    }
  }
 
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.renderer.setStyle(this.icon, 'display', 'inline-block');
    this.renderer.setStyle(this.icon, 'color', 'blue');
  }
 
  @HostListener('mouseleave')
  onMouseLeave(): void {
    const isSorted = this.sortDirection ? true : false;
    if(isSorted) {
      this.renderer.removeStyle(this.icon, 'color');
      return;
    }
 
    this.renderer.setStyle(this.icon, 'display', 'none');
  }
 
  onClick(): void {
    this.toggleDirection();
    this.updateIcon();
    this.sortChange.emit({ sortColumn: this.sortColumnName, sortDirection: this.sortDirection });
  }
 
  protected toggleDirection(): void {
    switch (this.sortDirection) {
      case '':
        this.sortDirection = 'asc';
        break;
      case 'asc':
        this.sortDirection = 'desc';
        break;
      case 'desc':
        this.sortDirection = 'asc';
        break;
      default:
        this.sortDirection = '';
        break;
    }
  }
 
  protected updateIcon(): void {
    const iconMap: Record<SortDirection, string> = {
      '': this.ASC_CLASS_NAME,
      asc: this.ASC_CLASS_NAME,
      desc: this.DESC_CLASS_NAME
    };
    this.renderer.setProperty(this.icon, 'className', iconMap[this.sortDirection]);
  }
}