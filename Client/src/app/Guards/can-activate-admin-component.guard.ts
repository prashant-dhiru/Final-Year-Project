import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { IsAuthenticatedService } from '../Shared/is-authenticated.service';

@Injectable()
export class CanActivateAdminComponentGuard implements CanActivate {

  constructor (private isAuthenticatedService: IsAuthenticatedService) {}

  canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuthenticatedService.isAdminAuthenticated();
  }
}
