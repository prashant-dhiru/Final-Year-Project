import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

import { ExamService } from '../exam.service';

import { Question } from '../../Classes/question';
import { QuestionAnswer } from '../../Classes/question-answer';
import { ExamReturn } from '../../Classes/exam-return';
import { Exam } from '../../Classes/exam';
import { ExamAnalysis } from '../../Classes/exam-analysis';
import { AggregateExamQuestionAnalysis } from '../../Classes/aggregate-exam-question-analysis';

@Component({
  selector: 'fyp-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.css']
})
export class ExamResultComponent implements OnInit {

  id: string;
  subscription: Subscription;
  analysisData: any;
  questions: Question[];
  questionAnswers: QuestionAnswer[];
  aggregateExamQuestionAnalysis: AggregateExamQuestionAnalysis[];
  examReturn: ExamReturn;
  exam: Exam;
  examAnalysis: ExamAnalysis;

  data = {
    single: [
      {
        name: 'Germany',
        value: 8940000
      },
      {
        name: 'USA',
        value: 5000000
      },
      {
        name: 'France',
        value: 7200000
      },
      {
        name: 'India',
        value: 6000000
      }
    ],
    view: [700, 400],
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: true,
    showXAxisLabel: true,
    xAxisLabel: 'Country',
    showYAxisLabel: true,
    yAxisLabel: 'Population',
    colorScheme: {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    },
  };

  constructor(private examService: ExamService, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.subscription = this.examService.getExamResult(this.id).subscribe((response: any) => {
      // this.analysisData = response.json();

      //
      this.questions = response.questions;
      delete response.questions;

      this.questionAnswers = response.questionResult;
      delete response.questionResult;

      this.examReturn = response.examResult;
      delete response.examResult;

      this.exam = response.exam;
      delete response.exam;

      this.examAnalysis =  response.examAnalysis;
      delete response.examAnalysis;

      this.aggregateExamQuestionAnalysis = response.aggregateExamQuestionAnalysis;
      delete response.aggregateExamQuestionAnalysis;
      //

      // if (this.analysisData.aggregateExamQuestionAnalysis.length) {
      //   const someval = this.mergeArrays(this.analysisData.aggregateExamQuestionAnalysis, 'question', this.analysisData.questions, '_id');
      //   // console.log(someval);
        
      //   if (this.analysisData.questionResult.length) {
      //     const someval2 = this.mergeArrays(this.analysisData.aggregateExamQuestionAnalysis, 'question', this.analysisData.questionResult, 'question');
      //     console.log(someval2);
          
      //   }
      // }
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
    const finalArray = [];
    for (let i = 0; i < arrayTwo.length; i++) {
      const idIndex = this.hasID(arrayTwo[i][arrayTwoKey], arrayOne, arrayOneKey);
      if (idIndex >= 0) {
        finalArray.push(Object.assign({}, arrayOne[idIndex], arrayTwo[i]));
      } else {
        finalArray.push(arrayTwo[i]);
      }
    }
    return finalArray;
  }

  mergeArraysStrictly (arrayOne, arrayOneKey, arrayTwo, arrayTwoKey) {
    const finalArray = [];
    for (let i = 0; i < arrayTwo.length; i++) {
      const idIndex = this.hasID(arrayTwo[i][arrayTwoKey], arrayOne, arrayOneKey);
      if (idIndex >= 0) {
        finalArray.push(Object.assign({}, arrayOne[idIndex], arrayTwo[i]));
      }
    }
    return finalArray;
  }

  onSelect(event) {
    console.log(event);
  }

}
