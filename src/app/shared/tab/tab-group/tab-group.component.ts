import { AfterContentInit, Component, ContentChildren, ElementRef, HostListener, inject, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { TabComponent } from '../tab/tab.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-tab-group',
  imports: [
    NgTemplateOutlet,
    MatTabsModule,
    MatMenuModule,
    MatButton,
  ],
  templateUrl: './tab-group.component.html',
  styleUrl: './tab-group.component.scss'
})
export class TabGroupComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabComponents!: QueryList<TabComponent>;

  @ViewChild('tabContainer', { static: true }) tabContainer!: ElementRef;

  readonly tabLabelSelector = '.mat-mdc-tab';

  allTabs: {
    id: string;
    labelTpl: TemplateRef<any>;
    contentTpl: TemplateRef<any>;
    width?: number;
  }[] = [];
 
  visibleTabs: any[] = [];
  overflowTabs: any[] = [];
  selectedIndex: number = 0;
  tabWidthMap: Map<string, any> = new Map();
  totalVisibleTabsWidth: number = 0;
 
  ngAfterContentInit() {
   this.initVisibleTabs();
 
    // Delay để Angular render xong
    setTimeout(() => this.initCalculateVisibleTabs(), 0);
  }
 
  @HostListener('window:resize')
  onResize() {
    this.expandVisibleTabs();
    this.collapseVisibleTabs();
  }
 
  initVisibleTabs() {
    this.allTabs = this.tabComponents.map(tab => ({
      id: tab.id,
      labelTpl: tab.labelTpl,
      contentTpl: tab.contentTpl,
    }));
 
    this.visibleTabs = this.allTabs;
  }
 
  initCalculateVisibleTabs() {
    const tabLabelElements = this.tabContainer.nativeElement.querySelectorAll(this.tabLabelSelector);
    const containerWidth = this.tabContainer.nativeElement.offsetWidth;
    const overflowButtonWidth = 100;
    let visibleCount = 0;
    this.totalVisibleTabsWidth = 0;

    this.tabWidthMap = new Map(Array.from(tabLabelElements).map((el: any, i: number) => [ this.allTabs[i].id, el.offsetWidth ]));

    for (const w of this.tabWidthMap.values()) {
      if (this.totalVisibleTabsWidth + w <= containerWidth - overflowButtonWidth) {
        this.totalVisibleTabsWidth += w;
        visibleCount++;
      } else {
        break;
      }
    }

    this.visibleTabs = this.allTabs.slice(0, visibleCount);
    this.overflowTabs = this.allTabs.slice(visibleCount);
  }
 
  selectOverflowTab(tab: any) {
    const containerWidth = this.tabContainer.nativeElement.offsetWidth;
    const overflowButtonWidth = 100;
    const selectedTabWidth = this.tabWidthMap.get(tab.id);
    let total = selectedTabWidth;
    let visibleCount = 0;

    for (const w of this.tabWidthMap.values()) {
      if (total + w <= containerWidth - overflowButtonWidth) {
        total += w;
        visibleCount++;
      } else {
        break;
      }
    }
 
    this.visibleTabs = this.allTabs.slice(0, visibleCount - 1);
    this.visibleTabs.push(tab);
    this.overflowTabs = this.allTabs.slice(visibleCount - 1).filter(t => t.id != tab.id);
    this.selectedIndex = visibleCount - 1;
    this.totalVisibleTabsWidth = total;
  }

  expandVisibleTabs() {
    const containerWidth = this.tabContainer.nativeElement.offsetWidth;
    const overflowButtonWidth = 100;

    if(this.totalVisibleTabsWidth > containerWidth - overflowButtonWidth) return;

    if(this.totalVisibleTabsWidth < containerWidth - overflowButtonWidth) {
      while(this.overflowTabs.length > 0 
        && this.totalVisibleTabsWidth + this.tabWidthMap.get(this.overflowTabs[0].id) < containerWidth
      ) {
        this.totalVisibleTabsWidth += this.tabWidthMap.get(this.overflowTabs[0].id);
        const ntab = this.overflowTabs.shift();
        this.visibleTabs.push(ntab);
      }
    }
  }

  collapseVisibleTabs() {
    const containerWidth = this.tabContainer.nativeElement.offsetWidth;
    const overflowButtonWidth = 100;

    if(this.totalVisibleTabsWidth < containerWidth - overflowButtonWidth) return;
  
    // keep selected tab
    const lastVisibleTabIndex = this.visibleTabs.length - 1;
    if(this.selectedIndex === lastVisibleTabIndex) {
      const overflowTab = this.visibleTabs.splice(this.selectedIndex - 1, 1)[0];
      this.overflowTabs.unshift(overflowTab);
      this.totalVisibleTabsWidth -= this.tabWidthMap.get(overflowTab.id);
      return;
    }

    const overflowTab = this.visibleTabs.pop();
    this.overflowTabs.unshift(overflowTab);
    this.totalVisibleTabsWidth -= this.tabWidthMap.get(overflowTab.id);
  }
}
