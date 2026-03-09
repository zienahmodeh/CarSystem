import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as string[];
    const userRole = localStorage.getItem('UserRole');

    if (requiredRoles && userRole && requiredRoles.includes(userRole)) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
