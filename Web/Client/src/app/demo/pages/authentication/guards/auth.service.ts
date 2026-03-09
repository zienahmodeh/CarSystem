import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);
  private jwtHelper = new JwtHelperService();
  private router = inject(Router);

  userToken: string | null = null;
  decodedToken: any = null;
  currentUserStr = localStorage.getItem('currentUserToken') ?? "";
  public CurrentUser: any = this.currentUserStr != null && this.currentUserStr != "" ? JSON.parse(this.currentUserStr) : null;

  parentTitleSource = new BehaviorSubject<string>('Dashboards');

  login(model: any): Observable<any> {
    return this.http.post<any>('Auth/login', model).pipe(
      tap(response => {
        if (!response.success) {
          this.toastr.error('Your account is inactive. Please contact the administrator.', 'Error');
          throw new Error('Inactive account');
        }
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('UserPermissions', JSON.stringify(response.permissions));
        localStorage.setItem('TokenName', JSON.stringify(response.tokenName));

        this.userToken = response.accessToken;
        this.decodedToken = jwtDecode(response.accessToken);
        if (this.decodedToken && (this.decodedToken as any).nameid) {
          localStorage.setItem('userId', this.decodedToken.nameid);
        }
        this.parseToken(this.userToken);
        this.parentTitleSource.next('Dashboards');
      }),
      catchError(error => {
        let errorMessage = 'An unknown error occurred!';
        if (error.statusText === 'Unauthorized') {
          this.toastr.error('Unauthorized', 'Error');
        }
        if (error.error && error.error.title) {
          errorMessage = error.error.title;
        } else if (error.title) {
          errorMessage = error.title;
        }
        return throwError(() => errorMessage);
      })
    );
  }

  logout(): Promise<boolean> {
    return new Promise(resolve => {
      this.http.post('Auth/logout', {}).subscribe({
        next: () => {
          localStorage.clear();
          this.userToken = null;
          this.CurrentUser = null;
          this.router.navigate(['dashboard/default']);
          resolve(true);
        },
        error: () => {
          resolve(false);
        }
      });
    });
  }

  loggedIn(): boolean {
    if (!this.userToken) {
      this.userToken = localStorage.getItem('token');
    }
    if (!this.userToken) return false;

    const date = this.getTokenExpirationDate(this.userToken);
    if (!date) return true;

    return !this.jwtHelper.isTokenExpired(this.userToken);
  }

  getTokenExpirationDate(token: string): Date | null {
    try {
      const decoded: any = jwtDecode(token);
      if (!decoded.exp) return null;
      const date = new Date(0);
      date.setUTCSeconds(decoded.exp);
      return date;
    } catch (err) {
      return null;
    }
  }

  parseToken(token: string) {
    try {
      const decodedToken: any = jwtDecode(token);
      const user = JSON.parse(decodedToken.unique_name);

      this.currentUserStr = JSON.stringify(user);
      this.CurrentUser = user;
      localStorage.setItem('currentUserToken', this.currentUserStr);
    } catch (err) {
      console.error('Token parsing error:', err);
    }
  }
  isGuid(value: string) {
    var regex = /[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}/i;
    var match = regex.exec(value);
    return match != null;
  }
  // ActionCheck(actionName: any) {
  //   let currentRoute = this.router.url;
  //   var splitUrl = currentRoute.split('/');
  //   if (this.isGuid(splitUrl[splitUrl.length - 1])) {
  //     var requiredPath = splitUrl.slice(0, splitUrl.length - 1).join("/");
  //     currentRoute = requiredPath;
  //   }
  //   const data: any = JSON.parse(localStorage.getItem('UserPermissions') ?? "");
  //   let permission = false;
  //   for (const page of data) {
  //     if (page.subPages.length > 0 && page.pageRoute === currentRoute) {
  //       for (let j = 0; j < page.subPages.length; j++) {
  //         if (actionName.toLowerCase() === page.subPages[j].pageName.toLowerCase()) {
  //           permission = true;
  //           return permission;
  //         }
  //       }
  //     }
  //     if (page.actions.length > 0 && page.pageRoute === currentRoute) {
  //       for (let j = 0; j < page.actions.length; j++) {
  //         if (actionName.toLowerCase() === page.actions[j].actionName.toLowerCase()) {
  //           permission = true;
  //           return permission;
  //         }
  //       }
  //     }
  //     for (const subPage of page.subPages) {
  //       if (subPage.subPages.length > 0 && subPage.pageRoute === currentRoute) {
  //         for (let j = 0; j < subPage.subPages.length; j++) {
  //           if (actionName.toLowerCase() === subPage.subPages[j].pageName.toLowerCase()) {
  //             permission = true;
  //             return permission;
  //           }
  //         }
  //       }
  //       if (subPage.actions.length > 0 && subPage.pageRoute === currentRoute) {
  //         for (let j = 0; j < subPage.actions.length; j++) {
  //           if (actionName.toLowerCase() === subPage.actions[j].actionName.toLowerCase()) {
  //             permission = true;
  //             return permission;
  //           }
  //         }
  //       }
  //       for (const subPage2 of subPage.subPages) {
  //         if (subPage2.subPages.length > 0 && subPage2.pageRoute === currentRoute) {
  //           for (let j = 0; j < subPage2.subPages.length; j++) {
  //             if (actionName.toLowerCase() === subPage2.subPages[j].pageName.toLowerCase()) {
  //               permission = true;
  //               return permission;
  //             }
  //           }
  //         }
  //         if (subPage2.actions.length > 0 && subPage2.pageRoute === currentRoute) {
  //           for (let j = 0; j < subPage2.actions.length; j++) {
  //             if (actionName.toLowerCase() === subPage2.actions[j].actionName.toLowerCase()) {
  //               permission = true;
  //               return permission;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return permission;
  // }
  // onClearParams() {
  //   this.userId = null;
  // }
}