import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fyp-route-not-found',
  templateUrl: './route-not-found.component.html',
  styleUrls: ['./route-not-found.component.css']
})
export class RouteNotFoundComponent implements OnInit {

  url: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.url = this.router.url;
  }

}
