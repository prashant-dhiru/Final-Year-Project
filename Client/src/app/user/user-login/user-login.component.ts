import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { setTimeout } from 'timers';
import { Subscription } from 'rxjs/Rx';

import { IsAuthenticatedService } from '../../Shared/is-authenticated.service';
import { UserService } from '../user.service';

@Component({
  selector: 'fyp-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
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

  onSubmit (): void {
    this.subscription = this.userService.loginUser(this.userLoginForm.value).subscribe((response: Response) => {
      this.isAuthenticatedService.authenticateUser();
      this.router.navigate(['/exam']);
    }, (error: any) => {
      console.error(error);
      if ( error.status === 405 ) {
        if (this.isAuthenticatedService.isUserAuthenticated()) {
          return this.router.navigate(['/exam']);
        }
        this.isLoginFailure = 2;
        // some one alreay logged in
        this.isAuthenticatedService.authenticateUser();
        setTimeout(() => {
          this.router.navigate(['/user']);
        }, 3000);
      } else {
        // 400
        this.isLoginFailure = 1;
      }
    }, () => {
      this.subscription.unsubscribe();
    });
  }

}
