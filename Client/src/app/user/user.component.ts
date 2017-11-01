import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fyp-user',
  template: `
  <div class="bs-component">
    <router-outlet></router-outlet>
  </div>
  `
})
export class UserComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
