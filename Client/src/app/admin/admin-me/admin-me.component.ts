import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Response } from '@angular/http';

import { AdminService } from '../admin.service';

@Component({
  selector: 'fyp-admin-me',
  templateUrl: './admin-me.component.html',
  styles: []
})
export class AdminMeComponent implements OnInit {

  syncStatus = -1;
  subscription: Subscription;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    const adminAuthenticated = this.isAdminAuthenticated();
    this.subscription = this.adminService.checkAdminAuthenticated().subscribe((response: Response) => {
      if (adminAuthenticated) {
        this.syncStatus = 0;
        // all good, both synced
      } else {
        this.syncStatus = 1;
        // synced from server but not from here
      }
    }, (error: any) => {
      if (adminAuthenticated) {
        this.syncStatus = 2;
        // synced from here, but not from server
      } else {
        this.syncStatus = 3;
        // all good, both unsynced
      }
    }, () => {
      this.subscription.unsubscribe();
    });
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

}
