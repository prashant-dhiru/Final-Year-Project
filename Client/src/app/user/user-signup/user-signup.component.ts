import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class UserSignupComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  subscription: Subscription;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit() {
    this.subscription = this.userService.registerUser(this.loginForm.value).subscribe((response: Response) => {
      console.log('Response is: ', response);
      this.loginForm.reset({'phoneNumber': ''});
    });
  }
  /////////////////////////////////////////////

  phoneNumberValidator (control: FormControl): {[s: string]: boolean} {
    if (!validator.isMobilePhone((<string>control.value), 'en-IN')) {
      return {phoneNumberValidator: true};
    }
    return null;
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
      'studentClass': new FormControl('', Validators.required),
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

  ///////////////////////////////////////////////
  emailUniqueValidator (control: FormControl): Promise<any> | Observable<any> {

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


}
