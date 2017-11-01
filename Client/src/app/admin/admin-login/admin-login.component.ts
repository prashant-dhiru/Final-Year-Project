import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { IsAuthenticatedService } from '../../Shared/is-authenticated.service';

import { AdminService } from '../admin.service';

@Component({
  selector: 'fyp-admin-login',
  templateUrl: './admin-login.component.html',
  styles: []
})
export class AdminLoginComponent implements OnInit {

  subscription: Subscription;
  adminLoginForm: FormGroup;
  isLoginFailure = 0;

  constructor(private adminService: AdminService, private router: Router, private isAuthenticatedService: IsAuthenticatedService) {}

  ngOnInit() {
    this.initAdminLoginForm();
  }

  initAdminLoginForm () {
    this.adminLoginForm = new FormGroup({
      'password': new FormControl()
    });
  }

  onSubmit () {
    if (this.isAuthenticatedService.isAdminAuthenticated()) {
      return this.isLoginFailure = 2;
    }
    this.subscription = this.adminService.loginAdmin(this.adminLoginForm.controls['password'].value).subscribe((response: Response) => {
      this.isAuthenticatedService.authenticateAdmin();
      this.router.navigate(['/admin/create-exam']);
    }, (error: any) => {
      if (error.status === 405) {
        this.isLoginFailure = 2;
      } else {
        this.isLoginFailure = 1;
      }
      this.adminLoginForm.reset();
      // 405 logged in
      // 400 unauthorised access
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  resetIsLoginFailure () {
    this.isLoginFailure = 0;
  }

}
