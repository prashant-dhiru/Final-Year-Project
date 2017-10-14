import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Response } from '@angular/http';

import { AdminService } from './admin.service';

@Component({
  selector: 'fyp-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  adminLoginForm: FormGroup;
  isAdminAuthenticated = false; // isAdminAuthenticated

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.initadminLoginForm();
  }

  initadminLoginForm () {
    this.adminLoginForm = new FormGroup({
      'password': new FormControl()
    });
  }

  onSubmit () {
    if (window.sessionStorage.getItem('isAuthenticated') === 'true' ) {
      // someone already logged in
      return;
    }
    this.adminService.loginAdmin(this.adminLoginForm.value.password).subscribe((response: Response) => {
      if (response.status === 200) {
        // document.cookie.
        window.sessionStorage.setItem('isAuthenticated', 'true');
        window.sessionStorage.setItem('userLevel', '0');
        this.isAdminAuthenticated = true;
      } else {
        this.isAdminAuthenticated = false;
        // 405 for someone already logged in
        // 400 for password incorrect
      }
    });
  }

  logoutAdmin () {
    this.adminService.logoutAdmin().subscribe((response: Response) => {

    });
  }

}
