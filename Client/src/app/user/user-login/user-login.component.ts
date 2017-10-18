import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'fyp-user-login',
  templateUrl: './user-login.component.html'
})
export class UserLoginComponent implements OnInit {

  userLoginForm: FormGroup;
  subscription: Subscription;
  isLoginFailure = 0;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.initUserLoginForm();
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
    if (this.isUserAuthenticated()) {
      return this.isLoginFailure = 2;
    }
    this.subscription = this.userService.loginUser(this.userLoginForm.value).subscribe((response: Response) => {
      window.sessionStorage.setItem('isAuthenticated', 'true');
      window.sessionStorage.setItem('userLevel', '1');
      this.router.navigate(['/exam']);
    }, (error: any) => {
      if ( error.status === 405 ) {
        this.isLoginFailure = 2;
      } else {
        // 400
        this.isLoginFailure = 1;
      }
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  resetIsLoginFailure () {
    this.isLoginFailure = 0;
  }

}
