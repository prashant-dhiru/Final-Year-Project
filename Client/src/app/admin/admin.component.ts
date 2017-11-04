import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { AdminService } from './admin.service';
import { IsAuthenticatedService } from '../Shared/is-authenticated.service';

@Component({
  selector: 'fyp-admin',
  template: `
  <div class="bs-component">
    <router-outlet></router-outlet>
  </div>
  `
})
export class AdminComponent implements OnInit {

  subscription: Subscription;

  constructor(private adminService: AdminService, private router: Router, private isAuthenticatedService: IsAuthenticatedService) {}

  ngOnInit() {
  }

  isAdminAuthenticated () {
    return this.isAuthenticatedService.isAdminAuthenticated();
  }

}
