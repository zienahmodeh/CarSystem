import { Component, output } from '@angular/core';


import { NavLeftComponent } from './nav-left/nav-left.component';
import { NavRightComponent } from './nav-right/nav-right.component';

@Component({
  selector: 'app-nav-bar',
  imports: [NavLeftComponent, NavRightComponent],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  NavCollapse = output();
  NavCollapsedMob = output();

  navCollapsed: boolean;
  windowWidth: number;
  navCollapsedMob: boolean;

  constructor() {
    this.windowWidth = window.innerWidth;
    this.navCollapsedMob = false;
  }

  navCollapse() {
    if (this.windowWidth >= 1025) {
      this.navCollapsed = !this.navCollapsed;
      this.NavCollapse.emit();
    }
  }

  navCollapseMob() {
    if (this.windowWidth < 1025) {
      this.NavCollapsedMob.emit();
    }
  }
}
