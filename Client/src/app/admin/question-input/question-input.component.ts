import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Response } from '@angular/http';
import { Subscription, Observable } from 'rxjs/Rx';

import { AdminService } from '../admin.service';
import { IsAuthenticatedService } from '../../Shared/is-authenticated.service';

@Component({
  selector: 'fyp-question-input',
  templateUrl: './question-input.component.html',
  styleUrls: ['./qustion-input.component.css']
})
export class QuestionInputComponent implements OnInit {

  isSubmissionFailed = -1;
  questionItemForm: FormGroup;
  subscription: Subscription;
  id: string;
  lastSubmittedQuestionId: string;

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private isAuthenticatedService: IsAuthenticatedService
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.questionItemForm = new FormGroup({
      'body': new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000),
        this.containsNoSpaceValidator
      ], [
        this.questionUniqueValidator.bind(this)
      ]),
      'answerOptionOne': new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(100),
        Validators.required,
        this.containsNoSpaceValidator
      ]),
      'answerOptionTwo': new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(100),
        Validators.required,
        this.containsNoSpaceValidator
      ]),
      'answerOptionThree': new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(100),
        Validators.required,
        this.containsNoSpaceValidator
      ]),
      'answerOptionFour': new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(100),
        Validators.required,
        this.containsNoSpaceValidator
      ]),
      'correctAnswer': new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(100),
        Validators.required
      ]),
      'marksForCorrectAnswer': new FormControl('', [
        Validators.required,
        Validators.maxLength(2),
        Validators.pattern('^[0-9]+$')
      ]),
      'negativeMark': new FormControl('', [
        Validators.required,
        Validators.maxLength(1),
        Validators.pattern('^[0-9]+$')
      ]),
      'difficulty': new FormControl('1', [
        Validators.min(1),
        Validators.max(5),
        Validators.maxLength(1)
      ])
    });
  }

  onSubmit() {
    this.subscription = this.adminService.putQuestionIntoExam(this.questionItemForm.value, this.id).subscribe((response: Response) => {
      this.isSubmissionFailed = 0;
      this.lastSubmittedQuestionId = response.json()._id;
    }, (error: any) => {
      if (error.status === 401) {
        this.isSubmissionFailed = 1;
        // 401 unauthorised
      } else if (error.status === 400) {
        this.isSubmissionFailed = 2;
        // 400 invalid exam id
      } else if (error.status === 404) {
        this.isSubmissionFailed = 3;
        // 404 exam with such id not present
      } else {
        this.isSubmissionFailed = 4;
        // 500 internal server error while searching for exam
        // also contain unique voilation, if any
      }
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  resetIsSubmissionFailed () {
    this.isSubmissionFailed = -1;
  }

  questionUniqueValidator (control: AbstractControl): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> {
    return new Promise((resolve, reject) => {
      this.adminService.checkQuestionUnique(control.value).subscribe((response: Response) => {
        response.json().found ? resolve({questionUniqueValidator: true}) : resolve(null);
      }, (error: any) => resolve({questionUniqueValidator: true}));
    });
  }

  containsNoSpaceValidator (control: FormControl): {[s: string]: boolean} {
    const controlValue = (<string>control.value);
    if (!controlValue) {
      return null;
    }
    if (controlValue.trim().length > 0) {
      return null;
    }
    return {containsNoSpaceValidator: true};
  }

}
