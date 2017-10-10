import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fyp-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  isUserLoggedIn: boolean;

  constructor() {}

  ngOnInit() {
    if (window.sessionStorage.getItem('isAuthenticated')) {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
  }

}
