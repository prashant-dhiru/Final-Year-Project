import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';

import { AdminService } from '../../admin.service';
import { Exam } from '../../../Classes/exam';
import { IsAuthenticatedService } from '../../../Shared/is-authenticated.service';

@Component({
  selector: 'fyp-display-exam',
  templateUrl: './display-exam.component.html',
  styleUrls: ['./display-exam.component.css']
})
export class DisplayExamComponent implements OnInit {

  id: string;
  subscription: Subscription;
  submissionError = -1;
  exam: Exam;

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private isAuthenticatedService: IsAuthenticatedService
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.subscription = this.adminService.checkExam(this.id).subscribe((response: Response) => {
      this.submissionError = 0;
      this.exam = response.json();
    }, (error: any) => {
      if (error.status === 401) {
        this.submissionError = 1;
        // 401 unauthorised
      } else if (error.status === 400) {
        this.submissionError = 2;
        // 400 invalid exam id
      } else if (error.status === 404) {
        this.submissionError = 3;
        // 404 exam not found
      } else {
        this.submissionError = 4;
        // 500 any internal error
      }
    }, () => {
      this.subscription.unsubscribe();
    });
  }

}
