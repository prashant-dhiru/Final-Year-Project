import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { UserService } from '../user/user.service';
import { AdminService } from '../admin/admin.service';
import { IsAuthenticatedService } from '../Shared/is-authenticated.service';

@Component({
  selector: 'fyp-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  subscription: Subscription;

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private router: Router,
    private isAuthenticatedService: IsAuthenticatedService
  ) { }

  ngOnInit() {
  }

  logoutUser () {
    this.subscription = this.userService.logoutuser().subscribe((response: Response) => {
      this.isAuthenticatedService.unAuthenticate();
      this.router.navigate(['/user/login']);
    }, (error: any) => {
      console.error('Logging Out Procedure Failed');
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  logoutAdmin () {
    this.subscription = this.adminService.logoutAdmin().subscribe((response: Response) => {
      this.isAuthenticatedService.unAuthenticate();
      this.router.navigate(['/admin', 'login']);
    }, (error: any) => {
      console.error('Logging Out Procedure Failed');
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  logout () {
    if (this.isAuthenticatedService.isUserAuthenticated()) {
      this.logoutUser();
    } else if (this.isAuthenticatedService.isAdminAuthenticated()) {
      this.logoutAdmin();
    }
  }

  ifAuthenticated () {
    return this.isAuthenticatedService.ifAuthenticated();
  }

}
