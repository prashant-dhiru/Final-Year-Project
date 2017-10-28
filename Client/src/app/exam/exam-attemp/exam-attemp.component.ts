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
  styles: []
})
export class ExamAttempComponent implements OnInit {

  examForm: FormGroup;
  timeNow = 0;
  lastSprintTime = 0;
  timer: Observable<any> = Observable.timer(0, 1000);
  timerSubscription: Subscription;

  // exam: Exam;
  subscription: Subscription;

  examData = {
    questionAnswers: []
  };
  id: string;

  exam = {
    name: 'SAMPLE EXAM 1',
    description: 'IDK if this will work',
    allowedTime: 180,
    subject: 'testsub1',
    createdAt: '2017-10-21T10:12:31.838Z',
    _id: '59eb1d8f0d185f115854b290',
    questions: [
      {
        body: 'this is que1',
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
        body: 'this is que2',
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

  constructor(private examService: ExamService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  submitAnswer(questionId: string, questionIndex: number) {

    const someval = {
      question: questionId,
      timeTaken: this.onLap(),
      answerSubmitted: this.examForm.value.questionAnswers[questionIndex]
    };

    this.examData.questionAnswers.push(someval);

    console.log(this.examData);

    // sprinting value becuase it is needed to spring value on every lap
    // sprinting has to be done after lap
    this.onSprint();

  }


  getExam () {
    this.subscription = this.examService.getExam(this.id).subscribe((response: Response) => {
      
      this.exam = response.json();
      console.log(this.exam);

      // starting the timer to tick
      this.timerSubscription = this.timer.subscribe((value) => {
        this.tickerFunc();
      });


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
  }

  ngOnInit() {
    // this.getExam();
    this.initExamForm();

    // temporary, to be cleareds
    this.timerSubscription = this.timer.subscribe((value) => {
      this.tickerFunc();
    });


  }

  tickerFunc () {
    this.timeNow++;

    // if (this.timeNow >= examTimeLimit) {
    //   finExam();
    // }
  }

  onSprint () {
    this.lastSprintTime = this.timeNow;
  }

  onLap (): number {
    return this.timeNow - this.lastSprintTime;
  }

  finExam () {
    // stopping the timer
    this.timerSubscription.unsubscribe();
  }

}
