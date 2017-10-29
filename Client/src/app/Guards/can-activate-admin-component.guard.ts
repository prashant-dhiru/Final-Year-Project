import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CanActivateAdminComponentGuard implements CanActivate {
  canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (window.sessionStorage.getItem('isAuthenticated')) {
      if (window.sessionStorage.getItem('userLevel') === '0') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
