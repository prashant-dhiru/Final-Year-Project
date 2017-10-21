import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import { FullExam } from '../../Classes/fullExam';
import { ExamService } from '../exam.service';
import { Question } from '../../Classes/question';

@Component({
  selector: 'fyp-exam-attemp',
  templateUrl: './exam-attemp.component.html',
  styles: []
})
export class ExamAttempComponent implements OnInit {

  timeNow = 0;
  lastSprintTime = 0;
  timer: Observable<any> = Observable.timer(0, 1000);
  timerSubscription: Subscription;

  examForm: FormGroup;
  id: string;
  exam: FullExam;
  subscription: Subscription;

  constructor(private examService: ExamService, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    // this.initExamForm();
    this.getExam();
  }

  initExamForm () {
    this.examForm = new FormGroup({
      'questionAnswers': new FormArray([])
    });
    (<any[]>this.exam.questions).forEach((question, index) => {
      this.onAddQuestion(question, index);
    });
  }

  onAddQuestion (question: Question, index: number) {
    (<FormArray>this.examForm.controls.questionAnswers).push(new FormGroup({
      'question': new FormControl(question._id),
      'answerSubmitted': new FormControl(),
      'questionId': new FormControl(index)
    }));
  }

  getExam () {
    this.subscription = this.examService.getExam(this.id).subscribe((response: Response) => {
      this.exam = response.json();
      console.log(this.exam);
      
      // starting the timer to tick
      this.timerSubscription = this.timer.subscribe((value) => {
        this.tickerFunc();
      });

      // this.initExam();
    }, (error: any) => {
      // stop the functionality here, print a message and quit the component
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  initExam () {
    // render the exam markup
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

  onLap () {
    // var lapval = this.timeNow - this.lastSprintTime;
  }

  onSubmitAnswer (questionInformation: any) {
    questionInformation.answerSubmitted = this.examForm.controls.questionAnswers[questionInformation.questionId].answerSubmitted.value;

    //lapping
    questionInformation.timeTaken = this.timeNow - this.lastSprintTime;
    
    // sprinting value becuase it is needed to spring value on every lap
    this.onSprint();

    // lap and store lap value here
  }

  finExam () {
    // stopping the timer
    this.timerSubscription.unsubscribe();
  }

/**
 * "questionAnswers": [
        {
            "question": "59e5a4ef69b1a21f448c60f9",
            "timeTaken": 150,
            "answerSubmitted": "op 2"
        }
    ]
 */

}
