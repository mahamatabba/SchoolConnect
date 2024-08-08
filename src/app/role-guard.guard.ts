import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './Service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['role'] as string;
    const userRole = this.authService.getUserRole();

    if (!userRole || userRole !== expectedRole) {
      this.router.navigate(['/access-denied']);
      return false;
    }

    return true;
  }
}
