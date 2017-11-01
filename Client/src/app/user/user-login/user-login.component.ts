import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { IsAuthenticatedService } from '../../Shared/is-authenticated.service';

@Component({
  selector: 'fyp-user-login',
  templateUrl: './user-login.component.html'
})
export class UserLoginComponent implements OnInit {

  userLoginForm: FormGroup;
  subscription: Subscription;
  isLoginFailure = 0;

  constructor(
    private userService: UserService,
    private router: Router,
    private isAuthenticatedService: IsAuthenticatedService
  ) {}

  ngOnInit() {
    this.initUserLoginForm();
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
    if (this.isAuthenticatedService.isUserAuthenticated()) {
      return this.isLoginFailure = 2;
    }
    this.subscription = this.userService.loginUser(this.userLoginForm.value).subscribe((response: Response) => {
      this.isAuthenticatedService.authenticateUser();
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
