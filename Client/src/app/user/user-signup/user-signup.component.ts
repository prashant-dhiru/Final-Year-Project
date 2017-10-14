import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, FormControl, NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs/Rx';
import { Response } from '@angular/http';

import { UserService } from '../user.service';

import { User } from '../../Classes/user';

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

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.initForm();
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

  onSubmit() {
    if (this.isUserAuthenticated()) {
      return this.isRegistrationFailure = 2;
    }
    this.subscription = this.userService.registerUser(this.loginForm.value).subscribe((response: Response) => {
      this.student = response.json();
      this.isRegistrationFailure = 0;
      this.loginForm.reset({'phoneNumber': ''});
      window.sessionStorage.setItem('isAuthenticated', 'true');
      window.sessionStorage.setItem('userLevel', '1');
    }, (error: any) => {
      if (error.status === 405) {
        this.isRegistrationFailure = 2;
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
  emailUniqueValidator (control: FormControl): Promise<any> | Observable<any> {
    
    if (!this) {
      console.log('No this available');
      return Promise.reject('sjwejce');
    }

    const promise = new Promise(function (resolve, reject) {

      this.userService.checkEmailUnique(control.value).subscribe((response: Response) => {

        if (response.status !== 200) {
          return reject('Server Error');
        }
        const responseBody = response.json();

        if (responseBody.found === true) {
          reject('Email Found');
        } else {
          resolve(null);
        }

      }, (error) => reject(error));

    });

    return promise;

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


}
