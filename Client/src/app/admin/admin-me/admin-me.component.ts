import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { AdminService } from '../admin.service';
import { IsAuthenticatedService } from '../../Shared/is-authenticated.service';

@Component({
  selector: 'fyp-admin-me',
  templateUrl: './admin-me.component.html',
  styleUrls: ['./admin-me.component.css']
})
export class AdminMeComponent implements OnInit {

  syncStatus = -1;
  subscription: Subscription;
  constructor(
    private adminService: AdminService,
    private isAuthenticatedService: IsAuthenticatedService,
    private router: Router
  ) { }

  ngOnInit() {
    const adminAuthenticated = this.isAuthenticatedService.isAdminAuthenticated();
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
        this.router.navigate(['admin', 'login']);
      }
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  refreshBrowser () {
    window.location.reload();
  }


}
