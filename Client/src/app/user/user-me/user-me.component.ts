import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { IsAuthenticatedService } from '../../Shared/is-authenticated.service';
import { User } from '../../Classes/user';
import { UserService } from '../user.service';

@Component({
  selector: 'fyp-user-me',
  templateUrl: './user-me.component.html',
  styleUrls: ['./user-me.component.css']
})
export class UserMeComponent implements OnInit {

  subscription: Subscription;
  syncStatus = -1;
  user: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private isAuthenticatedService: IsAuthenticatedService
  ) { }

  ngOnInit() {
    const userauthenticated = this.isAuthenticatedService.isUserAuthenticated();
    this.subscription = this.userService.getUser().subscribe((response: Response) => {
      this.user = response.json();
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
          this.router.navigate(['user', 'login']);
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

  refreshBrowser () {
    window.location.reload();
  }

}
