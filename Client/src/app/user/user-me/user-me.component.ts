import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';

import { UserService } from '../user.service';

@Component({
  selector: 'fyp-user-me',
  templateUrl: './user-me.component.html',
  styles: []
})
export class UserMeComponent implements OnInit {

  subscription: Subscription;
  syncStatus = -1;

  constructor(private userService: UserService) { }

  ngOnInit() {
    const userauthenticated = this.isUserAuthenticated();
    this.subscription = this.userService.getUser().subscribe((response: Response) => {
      if (userauthenticated) {
        this.syncStatus = 0;
        // all good
      } else {
        this.syncStatus = 1;
        // synchronised from server, but not synchronised here
      }
    }, (error: any) => {
      if (error.status === 401) {
        if (userauthenticated) {
          this.syncStatus = 2;
          // not synchronised from server, but from here
        } else {
          this.syncStatus = 3;
          // neiter synchronised from server, nor from here
        }
      } else {
        if (userauthenticated) {
          this.syncStatus = 0;
        } else {
          this.syncStatus = 3;
        }
        // 501
        // couldnot get from server, here is truth
      }
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  isUserAuthenticated () {
    if (window.sessionStorage.getItem('isAuthenticated')) {
      if (window.sessionStorage.getItem('userLevel') === '1') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

}
