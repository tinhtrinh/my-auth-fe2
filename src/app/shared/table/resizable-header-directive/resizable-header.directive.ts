import { AfterViewInit, Directive, ElementRef, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResizableHeader]'
})
export class ResizableHeaderDirective implements AfterViewInit {
  protected resizer!: HTMLElement;
  protected startX!: number;
  protected startWidth!: number;
  protected isResizing = false;

  protected el = inject(ElementRef);
  protected renderer = inject(Renderer2);
 
  ngAfterViewInit() {
    this.initResizer();
  }
 
  initResizer() {
    const th = this.el.nativeElement;
 
    // Tạo thanh kéo resize
    this.resizer = this.renderer.createElement('span');
    this.renderer.addClass(this.resizer, 'resizer-bar');
    this.renderer.setStyle(this.resizer, 'opacity', '0')
    this.renderer.appendChild(th, this.resizer);
    this.renderer.setStyle(th, 'position', 'relative');
    this.renderer.setStyle(th, 'padding', '0 0.3125rem');
 
    // Gắn sự kiện
    this.renderer.listen(this.resizer, 'mouseenter', this.onMouseEnter.bind(this));
    this.renderer.listen(this.resizer, 'mouseleave', this.onMouseLeave.bind(this));
    this.renderer.listen(this.resizer, 'mousedown', this.onMouseDown.bind(this));
    this.renderer.listen('document', 'mousemove', this.onMouseMove.bind(this));
    this.renderer.listen('document', 'mouseup', this.onMouseUp.bind(this));
  }
 
  onMouseEnter() {
    this.renderer.setStyle(this.resizer, 'opacity', '1')
  }
 
  onMouseLeave() {
    if(this.isResizing) return;
    this.renderer.setStyle(this.resizer, 'opacity', '0')
  }
 
  onMouseDown(event: MouseEvent) {
    this.isResizing = true;
    this.startX = event.pageX;
    this.startWidth = this.el.nativeElement.offsetWidth;
    event.preventDefault();
  }
 
  onMouseMove(event: MouseEvent) {
    if (!this.isResizing) return;
    const deltaX = event.pageX - this.startX;
    const newWidth = this.startWidth + deltaX;
    this.renderer.setStyle(this.el.nativeElement, 'width', `${newWidth}px`);
  }
 
  onMouseUp() {
    this.isResizing = false;
  }
}
