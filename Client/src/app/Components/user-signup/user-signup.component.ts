import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, FormControl } from '@angular/forms';

import { User } from '../../Classes/user';

@Component({
  selector: 'fyp-user-signup',
  templateUrl: './user-signup.component.html'
})
export class UserSignupComponent implements OnInit {

  loginForm: FormGroup;

  constructor() {
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
        Validators.maxLength(14)
      ]),
      'email': new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(50)
      ]),
      'address': new FormControl('', Validators.maxLength(500)),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64)
      ])
    });
  }

/*contact: {
    phoneNumber: {
        validate: {
            validator: value => validator.isMobilePhone(value, 'en-IN'),
            message: '{VALUE} is not a Valid Phone Number.'
        }
    },
    email: {
        unique: true
    }
  }*/

  ngOnInit() {
  }

  onSubmit() {}

}
