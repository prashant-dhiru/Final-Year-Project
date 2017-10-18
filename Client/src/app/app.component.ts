import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';

import { UserService } from './user/user.service';

@Component({
  selector: 'fyp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.subscription = this.userService.getAuthStatus().subscribe((response: Response) => {
      const body = response.json();
      if (body.authStatus === 0) {
        window.sessionStorage.setItem('isAuthenticated', 'true');
        window.sessionStorage.setItem('userLevel', '0');
      } else if (body.authStatus === 1) {
        window.sessionStorage.setItem('isAuthenticated', 'true');
        window.sessionStorage.setItem('userLevel', '1');
      } else {
        window.sessionStorage.setItem('isAuthenticated', 'false');
        window.sessionStorage.setItem('userLevel', '-1');
      }
    }, (error: any) => {
      window.sessionStorage.setItem('isAuthenticated', 'false');
      window.sessionStorage.setItem('userLevel', '-1');
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  ngOnDestroy () {
    window.sessionStorage.clear();
  }

}
