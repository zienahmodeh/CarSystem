import { Component, inject, input, output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { IconService, IconDirective } from '@ant-design/icons-angular';
import {
  GiftOutline,
  CheckCircleOutline,
  LogoutOutline,
  UserOutline,
  LockOutline
} from '@ant-design/icons-angular/icons';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AuthService } from 'src/app/demo/pages/authentication/guards/auth.service';

@Component({
  selector: 'app-nav-right',
  imports: [IconDirective, RouterModule, NgScrollbarModule, NgbNavModule, NgbDropdownModule],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  private iconService = inject(IconService);
  private router = inject(Router);
  private authService = inject(AuthService);

  styleSelectorToggle = input<boolean>();
  Customize = output();
  windowWidth: number;
  currentUsername!: string;
  currentUserEmail!: string;
  currentUserRole!: string;

 constructor() {
    this.currentUsername = this.authService.CurrentUser?.FullName || 'User';
    this.currentUserEmail = this.authService.CurrentUser?.Email || '';
    this.currentUserRole = this.authService.CurrentUser?.RoleCodeStr || '';

    this.windowWidth = window.innerWidth;

    this.iconService.addIcon(
      CheckCircleOutline,
      GiftOutline,
      LogoutOutline,
      UserOutline,
      LockOutline
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
