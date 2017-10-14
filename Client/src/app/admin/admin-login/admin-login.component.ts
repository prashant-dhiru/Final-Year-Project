import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'fyp-admin-login',
  templateUrl: './admin-login.component.html',
  styles: []
})
export class AdminLoginComponent implements OnInit {

  adminLoginForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.initAdminLoginForm();
  }

  initAdminLoginForm () {
    this.adminLoginForm = new FormGroup({
      'password': new FormControl()
    });
  }

  onSubmit () {
    console.log(this.adminLoginForm.value);
  }

}
