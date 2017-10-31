import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Exam } from '../../Classes/exam';
import { ExamService } from '../exam.service';
import { Question } from '../../Classes/question';

@Component({
  selector: 'fyp-exam-attemp',
  templateUrl: './exam-attemp.component.html',
  styleUrls: ['./exam-attemp.component.css']
})
export class ExamAttempComponent implements OnInit {

  examForm: FormGroup;
  timeNow = 0;
  timeNowInMinutes: number;
  lastSprintTime = 0;
  timer: Observable<any> = Observable.timer(0, 995);
  timerSubscription: Subscription;
  subscription: Subscription;
  id: string;
  exam: Exam;
  examTimeLimit: number;

  /*
  exam = {
    name: 'SAMPLE EXAM 1',
    description: 'IDK if this will work',
    allowedTime: 1,
    subject: 'testsub1',
    createdAt: '2017-10-21T10:12:31.838Z',
    _id: '59eb1d8f0d185f115854b290',
    questions: [
      {
        body: 'this is que11111111111111111111111111111111111111111111111111111',
        answerOptionOne: 'op 1',
        answerOptionTwo: 'op 2',
        answerOptionThree: 'op 3',
        answerOptionFour: 'op 4',
        marksForCorrectAnswer: 4,
        negativeMark: 1,
        difficulty: undefined,
        _id: '59eb1dcb0d185f115854b292'
      },
      {
        body: 'this is que2222222222222222222222222222222222222222222222222222222222',
        answerOptionOne: 'option 1',
        answerOptionTwo: 'option 2',
        answerOptionThree: 'option 3',
        answerOptionFour: 'option 4',
        marksForCorrectAnswer: 4,
        negativeMark: 1,
        difficulty: undefined,
        _id: '59eb1dd80d185f115854b294'
      },
      {
        body: 'this is que3',
        answerOptionOne: 'opt 1',
        answerOptionTwo: 'opt 2',
        answerOptionThree: 'opt 3',
        answerOptionFour: 'opt 4',
        marksForCorrectAnswer: 4,
        negativeMark: 1,
        difficulty: undefined,
        _id: '59eb1df00d185f115854b298'
      },
      {
        body: 'this is que4',
        answerOptionOne: 'opto 1',
        answerOptionTwo: 'opto 2',
        answerOptionThree: 'opto 3',
        answerOptionFour: 'opto 4',
        marksForCorrectAnswer: 4,
        negativeMark: 1,
        difficulty: undefined,
        _id: '59eb1e000d185f115854b29a'
      },
      {
        body: 'this is que5',
        answerOptionOne: 'optio 1',
        answerOptionTwo: 'optio 2',
        answerOptionThree: 'optio 3',
        answerOptionFour: 'optio 4',
        marksForCorrectAnswer: 4,
        negativeMark: 1,
        difficulty: undefined,
        _id: '59eb1e110d185f115854b29c'
      }
    ]
  };
  */

  examData = {
    questionAnswers: [],
    totalTimeTaken: this.timeNow,
    exam: ''
  };

  constructor(private examService: ExamService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  submitAnswer(questionId: string, questionIndex: number) {

    if (!this.examForm.value.questionAnswers[questionIndex]) {
      return;
    }

    if (this.examData.questionAnswers.find((element) => element.question === questionId)) {
      return console.error('Answer for this question has already been submitted, not submitting this attemp');
    }

    const someval = {
      question: questionId,
      timeTaken: this.onLap(),
      answerSubmitted: this.examForm.value.questionAnswers[questionIndex]
    };

    this.examData.questionAnswers.push(someval);

    // sprinting value becuase it is needed to spring value on every lap
    // sprinting has to be done after lap
    this.onSprint();

    document.getElementById('btn' + questionId).setAttribute('disabled', 'true');
    document.getElementById('sb' + questionId).setAttribute('class', 'text-truncate text-success');

  }

  getExam () {
    this.subscription = this.examService.getExam(this.id).subscribe((response: Response) => {

      this.exam = response.json();
      console.log(this.exam);
      this.examTimeLimit = this.exam.allowedTime * 60;

      this.initExamForm();

      this.examTimeLimit = this.exam.allowedTime * 60;

      // init exam, if any process remaining

    }, (error: any) => {
      window.alert('Error Occured while fetching exam: ' + error.message);
      setTimeout(() => this.router.navigate(['../']), 1500);
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  initExamForm () {
    this.examForm = new FormGroup({
      'questionAnswers': new FormArray([])
    });
    (<Question[]>this.exam.questions).forEach((question, index) => {
      (<FormArray>this.examForm.controls.questionAnswers).push(new FormControl());
    });

    // starting the timer to tick
    this.timerSubscription = this.timer.subscribe((value) => {
      this.tickerFunc();
    });

  }

  ngOnInit() {
    this.getExam();
  }

  tickerFunc () {
    this.timeNow++;

    this.timeNowInMinutes = Math.floor(this.timeNow / 60);

    if (this.timeNow >= this.examTimeLimit) {
      this.finishExam();
    }
  }

  onSprint () {
    this.lastSprintTime = this.timeNow;
  }

  onLap (): number {
    return this.timeNow - this.lastSprintTime;
  }

  finishExam () {
    // stopping the timer
    this.timerSubscription.unsubscribe();
    this.examData.totalTimeTaken = this.timeNow;
    this.examData.exam = this.exam._id;

    console.log(this.examData);

    this.subscription = this.examService.submitExam(this.id, this.examData).subscribe((response: Response) => {
      console.log(response);
      this.router.navigate(['exam', 'submit', this.id]);
    }, (error: any) => {
      console.log(error);
      if (error.status === 401) {
        // 401 unauthenticated
      } else if (error.status === 501) {
        // 501 error whil fetching student detail
      } else if (error.status === 400) {
        // 400 invalid id
      } else {
        // 500 internal server error
      }
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  canDeactivateComponent (): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.timerSubscription.closed) {
      return window.confirm('An Exam is underway, are you sure want to leave?');
    } else {
      return false;
    }
  }

}
