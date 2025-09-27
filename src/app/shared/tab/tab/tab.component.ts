import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-tab',
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent {
  @Input() id!: string;
 
  @ContentChild('appTabLabel', { static: true }) labelTpl!: TemplateRef<any>;
  @ContentChild('appTabContent', { static: true }) contentTpl!: TemplateRef<any>;
}
