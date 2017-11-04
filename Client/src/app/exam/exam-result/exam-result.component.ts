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
  styleUrls: ['./exam-result.component.css']
})
export class ExamResultComponent implements OnInit {

  id: string;
  subscription: Subscription;
  analysisData: any;

  constructor(private examService: ExamService, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.subscription = this.examService.getExamResult(this.id).subscribe((response: Response) => {
      this.analysisData = response.json();
      console.log(this.analysisData);
      if (this.analysisData.aggregateExamQuestionAnalysis.length) {
        this.mergeArrays(this.analysisData.aggregateExamQuestionAnalysis, 'question', this.analysisData.questions, '_id');
        delete this.analysisData.questions;
        if (this.analysisData.questionResult.length) {
          this.mergeArrays(this.analysisData.aggregateExamQuestionAnalysis, 'question', this.analysisData.questionResult, 'question');
          delete this.analysisData.questionResult;
        }
      }
    }, (error: any) => {
      console.error(error);
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  hasID (arrayTwoId, arrayOne, arrayOneKey) {
    for (let i = 0; i < arrayOne.length; i++) {
      if (Object.is(arrayOne[i][arrayOneKey], arrayTwoId)) {
        return i;
      }
    }
    return -1;
  }

  mergeArrays (arrayOne, arrayOneKey, arrayTwo, arrayTwoKey) {
    for (let i = 0; i < arrayTwo.length; i++) {
      const idIndex = this.hasID(arrayTwo[i][arrayTwoKey], arrayOne, arrayOneKey);
      if (idIndex >= 0) {
        Object.assign(arrayOne[idIndex], arrayTwo[i]);
      } else {
        arrayOne.push(arrayTwo[i]);
      }
    }
    return arrayOne;
  }
}
