import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  // canActivate(): boolean {
  //   if (this.authService.isAdmin()) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/home']);
  //     return false;
  //   }
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.isAuthenticated();
    if (this.authService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
