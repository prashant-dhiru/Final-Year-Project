import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export interface CanComponentDeactivate {
  canDeactivateComponent: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateComponent implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivateComponent ? component.canDeactivateComponent() : true;
  }
}
