import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

import { ExamService } from '../exam.service';
import {
  getArtHistoryInspiredColorScheme,
  getModernAndCleanColorScheme,
  getMutedAndMinimalColorScheme
} from '../../Shared/getColorSchemes';

import {
  User,
  Exam,
  Question,
  ExamReturn,
  QuestionAnswer,
  ExamAnalysis,
  AggregateExamQuestionAnalysis,
  NormailzedHorizontalBarChart,
  AreaChart,
  LineChart,
  NumberCard,
  GraphData,
  SeriesData,
  ColorScheme,
  GraphDataSet,
  NumberCardDataSet
} from '../../Classes';

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
  selectedQuestion: any;
  hasDataLoadingComplete = false;

  percentWhoAttemptedDataSet: GraphDataSet;
  percentWhoGotRight: GraphDataSet;
  studentsAttempted: NumberCardDataSet;
  marksComparison: GraphDataSet;
  timeComparison: GraphDataSet;

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

      this.selectQuestionForDisplay(this.questions[0]._id, 1);

      this.percentWhoAttemptedDataSet = {
        graphData: this.mapPercentWhoAttempted(),
        graphColorScheme: this.getArtHistoryInspiredColorScheme(),
        graphSize: [undefined, ((this.aggregateExamQuestionAnalysis.length * 35) + 50)]
      };

      this.percentWhoGotRight = {
        graphData: this.mapPercentWhoGotRight(),
        graphColorScheme: this.getArtHistoryInspiredColorScheme(),
        graphSize: [undefined, ((this.aggregateExamQuestionAnalysis.length * 35) + 50)]
      };

      const browserWindowWidth = window.innerWidth || document.body.clientWidth;

      this.studentsAttempted = {
        graphData: this.mapStudentsAttempted(),
        graphColorScheme: this.getArtHistoryInspiredColorScheme(),
        graphSize: [(browserWindowWidth - (browserWindowWidth / 10)), undefined]
      };

      this.marksComparison = {
        graphData: this.mapMarksObtained(),
        graphColorScheme: this.getArtHistoryInspiredColorScheme(),
        graphSize: [undefined, undefined]
      };

      this.timeComparison = {
        graphData: this.mapTimeTaken(),
        graphColorScheme: this.getArtHistoryInspiredColorScheme(),
        graphSize: [undefined, undefined]
      };

      this.hasDataLoadingComplete = true;

      // for each question, use 35 as height, and add 50 in total after calculation for the x axis display
      // 35 * 10 question  = 350, 350 + 50 for x axis = 400 total height

    }, (error: any) => console.error(error), () => this.subscription.unsubscribe());
  }

  hasID (arrayTwoId, arrayOne, arrayOneKey): number {
    for (let i = 0; i < arrayOne.length; i++) {
      if (Object.is(arrayOne[i][arrayOneKey], arrayTwoId)) {
        return i;
      }
    }
    return -1;
  }

  mergeArrays (arrayOne, arrayOneKey, arrayTwo, arrayTwoKey): any[] {
    const finalArray = arrayOne;
    for (let i = 0; i < arrayTwo.length; i++) {
      const idIndex = this.hasID(arrayTwo[i][arrayTwoKey], arrayOne, arrayOneKey);
      if (idIndex >= 0) {
        Object.assign(finalArray[idIndex], arrayTwo[i]);
      } else {
        finalArray.push(arrayTwo[i]);
      }
    }
    return finalArray;
  }

  mergeArraysStrictly (arrayOne, arrayOneKey, arrayTwo, arrayTwoKey): any[] {
    const finalArray = [];
    for (let i = 0; i < arrayTwo.length; i++) {
      const idIndex = this.hasID(arrayTwo[i][arrayTwoKey], arrayOne, arrayOneKey);
      if (idIndex >= 0) {
        finalArray.push(Object.assign({}, arrayOne[idIndex], arrayTwo[i]));
      }
    }
    return finalArray;
  }

  mapPercentWhoAttempted (): GraphData[] {
    return this.aggregateExamQuestionAnalysis.map(dataElement => {
      return {
        name: dataElement.question,
        series: [
          {
            name: 'percentageOfStudentWhoAttempted',
            value: dataElement.percentageOfStudentWhoAttempted
          },
          {
            name: 'percentageOfStudentWhoNotAttempted',
            value: (100 - dataElement.percentageOfStudentWhoAttempted)
          }
        ]
      };
    });
  } // normailzed horizontal bar chart
  // done

  mapPercentWhoGotRight (): GraphData[] {
    return this.aggregateExamQuestionAnalysis.map(dataElement => {
      return {
        name: dataElement.question,
        series: [
          {
            name: 'percentageOfStudentWhoAttemptedGotThisQuestionRight',
            value: dataElement.percentageOfStudentWhoAttemptedGotThisQuestionRight
          },
          {
            name: 'percentageOfStudentWhoAttemptedGotThisQuestionWrong',
            value: (100 - dataElement.percentageOfStudentWhoAttemptedGotThisQuestionRight)
          }
        ]
      };
    });
  } // normalized horizontal bar chart
  // done

  mapStudentsAttempted (): SeriesData[] {
    return this.aggregateExamQuestionAnalysis.map(dataElement => {
      return {
        name: dataElement.question,
        value: dataElement.studentsAttempted
      };
    });
  } // number cards
  // done

  mapMarksObtained (): GraphData[] {
    if (!this.questionAnswers.length) {
      return [];
    }
    const mergedArray = this.mergeArraysStrictly(this.aggregateExamQuestionAnalysis, 'question', this.questionAnswers, 'question');
    return mergedArray.map(dataElement => {
      return {
        name: dataElement.question,
        series: [
          {
            value: dataElement.cutOff,
            name: 'AverageMarksObatinedByStudents'
          },
          {
            value: dataElement.marksObtained,
            name: 'MarksObtaintedByYou'
          }
        ]
      };
    });
  } // line chart
  // done

  mapTimeTaken (): GraphData[] {
    if (!this.questionAnswers.length) {
      return [];
    }
    const mergedArray = this.mergeArraysStrictly(this.aggregateExamQuestionAnalysis, 'question', this.questionAnswers, 'question');
    return mergedArray.map(dataElement => {
      return {
        name: dataElement.question,
        series: [
          {
            value: dataElement.avreageTimeTakenByStudents,
            name: 'avreageTimeTakenByStudents'
          },
          {
            value: dataElement.avreageTimeTakenByStudentsWhoGotThisQuestionRight,
            name: 'avreageTimeTakenByStudentsWhoGotThisQuestionRight'
          },
          {
            value: dataElement.timeTaken,
            name: 'timeTakenByYou'
          }
        ]
      };
    });
  } // area chart

  selectQuestionForDisplay (questionID: string, questionNumber: number): void {
    const question = this.questions.find(que => que._id === questionID);
    const questionAnswer = this.questionAnswers.find(queA => queA.question === questionID);
    this.selectedQuestion = Object.assign({}, question, questionAnswer);
    Object.defineProperty(this.selectedQuestion, 'questionNumber', {
      value: questionNumber
    });
  }

  // aggregateExamQuestionAnalysis key question 7 fields
  // questions key _id 9 fields
  // questionAnswers key question 5 fields

  getArtHistoryInspiredColorScheme (): ColorScheme {
    return new ColorScheme([
        '#FFCE00',
        '#0375B4',
        '#007849',
        '#262228'
    ]);
  }

}
