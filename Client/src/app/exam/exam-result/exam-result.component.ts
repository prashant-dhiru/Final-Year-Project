import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import { ExamService } from '../exam.service';
import { ExamReturn } from '../../Classes/exam-return';

@Component({
  selector: 'fyp-exam-result',
  templateUrl: './exam-result.component.html',
  styles: []
})
export class ExamResultComponent implements OnInit {

  subscription: Subscription;
  id: string;
  errorStatus = -1;
  examReturn: ExamReturn;

  constructor(private examService: ExamService, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.subscription = this.examService.getExamQuickResult(this.id).subscribe((response: Response) => {
      this.examReturn = response.json();
      this.errorStatus = 0;
    }, (error: any) => {
      if (error.status === 401) {
        this.errorStatus = 1;
        // 401 unauth
      } else if (error.status === 400) {
        this.errorStatus = 2;
        // 400 invalid exam id
      } else if (error.status === 404) {
        this.errorStatus = 3;
        // 404 no examreturn
      } else {
        this.errorStatus = 4;
        // 500 error while fetching exam return
      }
    }, () => {
      this.subscription.unsubscribe();
    });
  }

}
