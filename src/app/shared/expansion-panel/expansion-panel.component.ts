import { Component, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expansion-panel',
  imports: [CommonModule],
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.scss'
})
export class ExpansionPanelComponent {
  @ContentChild('appExpansionPanelTitle', { static: true }) expansionPanelTitleTpl!: TemplateRef<any>;
  @ContentChild('appExpansionPanelContent', { static: true }) expansionPanelContentTpl!: TemplateRef<any>;
 
  isCollapse: boolean = false;
 
  onToggle() {
    this.isCollapse = !this.isCollapse;
  }
}
