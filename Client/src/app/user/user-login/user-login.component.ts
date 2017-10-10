import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { Response } from '@angular/http';

import { UserService } from '../user.service';

@Component({
  selector: 'fyp-user-login',
  templateUrl: './user-login.component.html'
})
export class UserLoginComponent implements OnInit, OnDestroy {

  userLoginForm: FormGroup;
  subscription: Subscription;
  isLoginFailure: number;

  constructor(private userService: UserService) {
    this.isLoginFailure = 0;
  }

  ngOnInit() {
    this.initUserLoginForm();
    if (window.sessionStorage.getItem('isAuthenticated')) {
      // user already logged in
      this.isLoginFailure = 2;
      return;
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    
  }

  initUserLoginForm () {
    this.userLoginForm = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(50)
      ]),
      'password': new FormControl('', [
        Validators.minLength(8),
        Validators.required,
        Validators.maxLength(64)
      ])
    });
  }

  onSubmit () {
    if (this.isLoginFailure) {
      return;
    }
    this.subscription = this.userService.loginUser(this.userLoginForm.value).subscribe((response: Response) => {
      if ( response.status === 200 ) {
        window.sessionStorage.setItem('isAuthenticated', 'true');
        window.sessionStorage.setItem('userLevel', '1');
        // redirect to exam component
        const responseBody = response.json();
      } else if ( response.status === 503 ) {
        this.isLoginFailure = 2;
        // 503 someone already logged in
      } else {
        // 405 internl eror or invalid credentials
        this.isLoginFailure = 1;
      }
    });
  }

}
