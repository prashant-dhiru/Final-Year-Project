import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { AdminService } from './admin.service';

@Component({
  selector: 'fyp-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  subscription: Subscription;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit() {
  }

  isAdminAuthenticated () {
    if (window.sessionStorage.getItem('isAuthenticated')) {
      if (window.sessionStorage.getItem('userLevel') === '0') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  logoutAdmin () {
    if (!this.isAdminAuthenticated()) {
      return;
    }
    this.subscription = this.adminService.logoutAdmin().subscribe((response: Response) => {
      window.sessionStorage.setItem('isAuthenticated', 'false');
      window.sessionStorage.setItem('userLevel', '-1');
      this.router.navigate(['/admin']);
    }, (error: any) => {
      console.error('Logging Out Procedure Failed');
    }, () => {
      this.subscription.unsubscribe();
    });
  }

}
