import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';

import { UserService } from './user/user.service';
import { IsAuthenticatedService } from './Shared/is-authenticated.service';

@Component({
  selector: 'fyp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(
    private userService: UserService,
    private isAuthenticatedService: IsAuthenticatedService
  ) {}

  ngOnInit() {
    this.subscription = this.userService.getAuthStatus().subscribe((response: Response) => {
      const body = response.json();
      if (body.authStatus === 0) {
        this.isAuthenticatedService.authenticateAdmin();
      } else if (body.authStatus === 1) {
        this.isAuthenticatedService.authenticateUser();
      } else {
        this.isAuthenticatedService.unAuthenticate();
      }
    }, (error: any) => {
      this.isAuthenticatedService.unAuthenticate();
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  ngOnDestroy () {
    this.isAuthenticatedService.clearStorage();
  }

}
