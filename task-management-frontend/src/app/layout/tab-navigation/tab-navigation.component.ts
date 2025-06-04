import { Component, EventEmitter, Input, Output } from '@angular/core';
export interface TabItem {
  id: string;
  label: string;
  icon: string;
  count?: number;
  adminOnly?: boolean;
}

@Component({
  selector: 'app-tab-navigation',
  imports: [],
  templateUrl: './tab-navigation.component.html',
  styleUrl: './tab-navigation.component.scss',
})
export class TabNavigationComponent {
  @Input() tabs: TabItem[] = [];
  @Input() activeTab = '';
  @Input() userRole: 'ADMIN' | 'USER' = 'USER';

  @Output() tabChange = new EventEmitter<string>();

  get visibleTabs(): TabItem[] {
    return this.tabs.filter(
      (tab) => !tab.adminOnly || this.userRole === 'ADMIN'
    );
  }

  selectTab(tabId: string): void {
    this.tabChange.emit(tabId);
  }

 }
