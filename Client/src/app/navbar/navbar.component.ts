import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { UserService } from '../user/user.service';

@Component({
  selector: 'fyp-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  subscription: Subscription;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
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

  logoutUser () {
    if (!this.isUserAuthenticated) {
      return;
    }
    this.subscription = this.userService.logoutuser().subscribe((response: Response) => {
      window.sessionStorage.setItem('isAuthenticated', 'false');
      window.sessionStorage.setItem('userLevel', '-1');
      this.router.navigate(['/user/login']);
    }, (error: any) => {
      console.error('Unable to Logout the User');
    }, () => {
      this.subscription.unsubscribe();
    });
  }

}
