import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

import { UserService } from './../../Services/user.service';

import { User } from '../../Classes/user';

const validator = require('validator');

@Component({
  selector: 'fyp-user-signup',
  templateUrl: './user-signup.component.html'
})
export class UserSignupComponent implements OnInit {

  loginForm: FormGroup;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.userService.registerUser(this.loginForm.value).subscribe((user: Response) => {
      console.log('Response is: ', user);
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
      ])
    });
  }

  ///////////////////////////////////////////////
  emailUniqueValidator (control: FormControl): Promise<any> | Observable<any> {

    const promise = new Promise((resolve, reject) => {

      this.userService.checkEmailUnique(control.value).subscribe((data: Response) => {
        console.log('Data Value is: ', data);
        resolve(null);
  
      }, (error) => reject(error));


      // setTimeout(() => {
      //     console.log('No this available');
      //     reject(null);
      // }, 1500);

      // return reject({emailUniqueValidator: true});

        // if (found: true) {
        //   resolve({emailUniqueValidator: true}) //validation failed
        // } else {
        //     resolve(null);  

    });

    return promise;

  }


}
