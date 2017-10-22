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
/*
  timeNow = 0;
  lastSprintTime = 0;
  timer: Observable<any> = Observable.timer(0, 1000);
  timerSubscription: Subscription;

  getExam () {
    this.subscription = this.examService.getExam(this.id).subscribe((response: Response) => {
      this.exam = response.json();
      console.log(this.exam);
      
      // starting the timer to tick
      this.timerSubscription = this.timer.subscribe((value) => {
        this.tickerFunc();
      });

      // this.initExam();
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

  submitAnswer(questionId: string, questionIndex: number) {

    const someval = {
      question: questionId,
      timeTaken: this.onLap(),
      answerSubmitted: this.examForm.controls.questionAnswers[questionIndex].value
    };
 
    // sprinting value becuase it is needed to spring value on every lap
    // sprinting has to be done after lap
    this.onSprint();

    //store this object wherever needed
    console.log(someval);
    
  }

  finExam () {
    // stopping the timer
    this.timerSubscription.unsubscribe();
  }*/

  examData = {
    questionAnswers: []
  };
  examGetterSuccess = -1;
  examForm: FormGroup;
  id: string;
  exam: Exam;
  subscription: Subscription;

  constructor(private examService: ExamService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.getExam();

  }

  getExam () {
    this.subscription = this.examService.getExam(this.id).subscribe((response: Response) => {
      this.exam = response.json();
      this.examGetterSuccess = 1;
      this.initExamForm();

      // init exam, if any process remaining
    }, (error: any) => {
      window.alert('Error Occured while fetching exam: ' + error.message);
      this.router.navigate(['../']);
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
  
}