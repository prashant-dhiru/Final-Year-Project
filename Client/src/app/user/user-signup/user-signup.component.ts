import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

import { User } from '../../Classes/user';
import { IsAuthenticatedService } from '../../Shared/is-authenticated.service';

const validator = require('validator');

@Component({
  selector: 'fyp-user-signup',
  templateUrl: './user-signup.component.html'
})
export class UserSignupComponent implements OnInit {

  loginForm: FormGroup;
  subscription: Subscription;
  isRegistrationFailure = -1;
  student: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private isAuthenticatedService: IsAuthenticatedService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    if (this.isAuthenticatedService.isUserAuthenticated()) {
      return this.isRegistrationFailure = 2;
    }
    this.subscription = this.userService.registerUser(this.loginForm.value).subscribe((response: Response) => {
      this.student = response.json();
      this.isRegistrationFailure = 0;
      this.loginForm.reset({'phoneNumber': ''});
      this.isAuthenticatedService.authenticateUser();
      this.router.navigate(['/exam']);
    }, (error: any) => {
      console.error(error);
      if (error.status === 405) {
        this.isRegistrationFailure = 2;
        // already logged in
      } else {
        this.isRegistrationFailure = 1; // 503
      }
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  phoneNumberValidator (control: FormControl): {[s: string]: boolean} {
    if (!validator.isMobilePhone((<string>control.value), 'en-IN')) {
      return {phoneNumberValidator: true};
    }
    return null;
  }

  ///////////////////////////////////////////////
  emailUniqueValidator (control: AbstractControl): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> {

    return new Promise((resolve, reject) => {
      this.userService.checkEmailUnique(control.value).subscribe((response: Response) => {
        response.json().found ? reject({emailUniqueValidator: true}) : resolve(null);
      }, (error: any) => reject({emailUniqueValidator: true}));
    });

    // return new Promise(resolve => {
    //   this.userService.checkEmailUnique(control.value).map(response => {
    //     response.json().found ? resolve({emailUniqueValidator: true}) : resolve(null);
    //   });
    // });
  }

  matchingPasswords (password, confirm) {
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value) {
        return null;
      } else {
        return { 'matchingPasswords': true };
      }
    };
  }

  initForm () {
    this.loginForm = new FormGroup({
      'firstName': new FormControl('', [
        Validators.maxLength(15),
        Validators.required
      ]),
      'middleName': new FormControl('', Validators.maxLength(15)),
      'lastName': new FormControl('', [
        Validators.maxLength(15),
        Validators.required
      ]),
      'phoneNumber': new FormControl('', [
        Validators.required,
        Validators.maxLength(14),
        this.phoneNumberValidator
      ]),
      'email': new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(50)
      ], [
        // this.emailUniqueValidator.bind(this)
      ]),
      'address': new FormControl('', Validators.maxLength(500)),
      'studentClass': new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64)
      ]),
      'confirm': new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64)
      ])
    }, this.matchingPasswords('password', 'confirm'));
  }

  resetIsRegistrationFailure () {
    this.isRegistrationFailure = -1;
  }


}
