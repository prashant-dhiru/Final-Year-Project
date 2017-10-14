import { Component, OnInit, OnDestroy } from '@angular/core';

import { IsAuthenticatedService } from './Shared/is-authenticated.service';

@Component({
  selector: 'fyp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private isAuthenticatedService: IsAuthenticatedService) {}

  ngOnInit() {
    window.sessionStorage.setItem('isAuthenticated', 'false');
    window.sessionStorage.setItem('userLevel', '-1');
  }

  ngOnDestroy () {
    window.sessionStorage.clear();
  }

}
