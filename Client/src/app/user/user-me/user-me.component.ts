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
  constructor(private userService: UserService) { }

  ngOnInit() {
    const userauthenticated = this.isUserAuthenticated();
    this.subscription = this.userService.getUser().subscribe((response: Response) => {
      if (userauthenticated) {
        // all good
      } else {
        // synchronised from server, but not synchronised here
      }
    }, (error: any) => {
      if (error.status === 401) {
        if (userauthenticated) {
          // not synchronised from server, but from here
        } else {
          // neiter synchronised from server, nor from here
        }
      } // else {
        // 501
        // couldnot get from server, here is truth
      // }
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
