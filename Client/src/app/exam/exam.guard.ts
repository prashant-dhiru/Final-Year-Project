import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

import { Subscription } from 'rxjs/Rx';

import { UserService } from '../user/user.service';

@Injectable()
export class ExamGuard implements CanActivate {

  subscription: Subscription;

  constructor(private userService: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return false;

    // this.subscription = this.userService.getUser((response: Response) => {

    //   // if (response.status == 200) {
    //   //   return true;
    //   // } else {
    //   //   return false;
    //   // }
    // });

  }
}
