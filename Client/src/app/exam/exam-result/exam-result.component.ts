import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

import { ExamService } from '../exam.service';

// requiring mngoose and pulling out ObjectId from it for validations
// const ObjectId = require('mongoose').Types.ObjectId;

@Component({
  selector: 'fyp-exam-result',
  templateUrl: './exam-result.component.html',
  styles: []
})
export class ExamResultComponent implements OnInit {

  id: string;
  subscription: Subscription;

  constructor(private examService: ExamService, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.subscription = this.examService.getExamResult(this.id).subscribe((response: Response) => {
      console.log(response.json());
    }, (error: any) => {
      console.error(error);
    }, () => {
      this.subscription.unsubscribe();
    });
  }

}
