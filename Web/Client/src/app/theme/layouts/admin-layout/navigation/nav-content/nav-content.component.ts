
import { Component, OnInit, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule, Location, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavigationItem } from '../navigation';

import { NavGroupComponent } from './nav-group/nav-group.component';

import { IconService } from '@ant-design/icons-angular';
import {
  DashboardOutline, CreditCardOutline, LoginOutline, QuestionOutline,
  ChromeOutline, FontSizeOutline, ProfileOutline, BgColorsOutline, AntDesignOutline,
  TeamOutline,
  ShopOutline,
  InboxOutline,
  AppstoreOutline,
  GlobalOutline,
  FileTextOutline,
  FileSearchOutline,
  HistoryOutline
} from '@ant-design/icons-angular/icons';

import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-nav-content',
  standalone: true,
  imports: [CommonModule, RouterModule, NavGroupComponent, NgScrollbarModule],
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent implements OnInit {
  private location = inject(Location);
  private locationStrategy = inject(LocationStrategy);
  private iconService = inject(IconService);

  @Output() NavCollapsedMob = new EventEmitter<void>();

  navigations: NavigationItem[] = [];

  windowWidth = window.innerWidth;

  constructor() {
    this.iconService.addIcon(
      DashboardOutline, CreditCardOutline, FontSizeOutline, LoginOutline,TeamOutline,
      ProfileOutline, BgColorsOutline, AntDesignOutline, ChromeOutline, QuestionOutline,
      ShopOutline,InboxOutline,AppstoreOutline, GlobalOutline,FileTextOutline,
      FileSearchOutline,HistoryOutline
    );
  }

  ngOnInit() {
    if (this.windowWidth < 1025) {
      (document.querySelector('.coded-navbar') as HTMLDivElement)?.classList.add('menupos-static');
    }

    const userPermissions = JSON.parse(localStorage.getItem('UserPermissions') || '[]');
    this.navigations = this.buildNavigationFromPermissions(userPermissions);
  }

  fireOutClick() {
    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }

    const ele = document.querySelector(`a.nav-link[href='${current_url}']`);
    let parent = ele?.parentElement;
    while (parent) {
      if (parent.classList.contains('coded-hasmenu')) {
        parent.classList.add('coded-trigger', 'active');
      }
      parent = parent.parentElement;
    }
  }

  navMob() {
    if (
      this.windowWidth < 1025 &&
      document.querySelector('app-navigation.coded-navbar')?.classList.contains('mob-open')
    ) {
      this.NavCollapsedMob.emit();
    }
  }

 buildNavigationFromPermissions(permissions: any[]): NavigationItem[] {
  const dashboardItems: NavigationItem[] = [];
  const lookupItems: NavigationItem[] = [];
  const pageItems: NavigationItem[] = [];

  const processPages = (pages: any[], parentType: 'lookup' | 'dashboard' | 'pages' = 'pages'): NavigationItem[] => {
    return pages
      .filter(p => p.isMenu)
      .map(p => {
        const route = p.pageRoute?.toLowerCase() || '';
        let type: 'lookup' | 'dashboard' | 'pages' = parentType;

        if (route.includes('lookup')) type = 'lookup';
        else if (route.includes('dashboard')) type = 'dashboard';

        const children = p.subPages?.length ? processPages(p.subPages, type) : undefined;

        const item: NavigationItem = {
          id: p.pageId,
          title: p.pageName,
          type: children?.length ? 'collapse' : 'item',
          url: p.pageRoute,
          icon: p.pageIcon || 'menu',
          classes: 'nav-item',
          breadcrumbs: p.breadcrumbs ?? false,
          target: p.target ?? false,
          external: p.external ?? false,
          children
        };

        if (type === 'lookup') {
          lookupItems.push(item);
        } else if (type === 'dashboard') {
          dashboardItems.push(item);
        } else {
          pageItems.push(item);
        }

        return item;
      });
  };

  processPages(permissions);

  const nav: NavigationItem[] = [];

  if (dashboardItems.length) {
    nav.push({
      id: 'dashboard',
      title: 'Dashboard',
      type: 'group',
      icon: 'icon-navigation',
      children: dashboardItems
    });
  }
  if (pageItems.length) {
    nav.push({
      id: 'pages',
      title: 'Pages',
      type: 'group',
      icon: 'icon-navigation',
      children: pageItems
    });
  }
  if (lookupItems.length) {
    nav.push({
      id: 'lookup',
      title: 'Lookup',
      type: 'group',
      icon: 'icon-navigation',
      children: lookupItems
    });
  }
  return nav;
}


}
