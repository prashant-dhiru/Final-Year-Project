import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Response } from '@angular/http';
import { Subscription, Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

import { AdminService } from '../admin.service';

@Component({
  selector: 'fyp-question-input',
  templateUrl: './question-input.component.html',
  styles: []
})
export class QuestionInputComponent implements OnInit {

  isSubmissionFailed = -1;
  questionItemForm: FormGroup;
  subscription: Subscription;
  id: string;

  constructor(private adminService: AdminService, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.questionItemFormInit();
  }

  questionItemFormInit () {
    this.questionItemForm = new FormGroup({
      'body': new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000)
        /*body: {unique: true}*/
      ], [
        // this.questionUniqueValidator.bind(this)
      ]),
      'answerOptionOne': new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(100),
        Validators.required
      ]),
      'answerOptionTwo': new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(100),
        Validators.required
      ]),
      'answerOptionThree': new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(100),
        Validators.required
      ]),
      'answerOptionFour': new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(100),
        Validators.required
      ]),
      'correctAnswer': new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(100),
        Validators.required
      ]),
      'marksForCorrectAnswer': new FormControl('4', [
        Validators.required,
        Validators.maxLength(2)
      ]),
      'negativeMark': new FormControl('1', [
        Validators.required,
        Validators.maxLength(1)
      ]),
      'difficulty': new FormControl('', [
        Validators.min(1),
        Validators.max(5),
        Validators.maxLength(1)
      ])
    });
  }

  onSubmit() {
    if (this.isAdminAuthenticated()) {
      return this.isSubmissionFailed = 1;
    }
    this.subscription = this.adminService.putQuestionIntoExam(this.questionItemForm.value).subscribe((response: Response) => {
      this.isSubmissionFailed = 0;
    }, (error: any) => {
      if (error.status === 401) {
        // 401 unauthorised
      } else if (error.status === 400) {
        // 400 invalid exam id
      } else if (error.status === 404) {
        // 404 exam with such id not present
      } else {
        // 500 internal server error while searching for exam
        // also contain unique voilation, if any
      }
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  isAdminAuthenticated () {
    if (window.sessionStorage.getItem('isAuthenticated') === 'true') {
      if (window.sessionStorage.getItem('userLevel') === '0') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  resetIsSubmissionFailed () {
    this.isSubmissionFailed = -1;
  }

  questionUniqueValidator (control: AbstractControl): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> {

    // return this.adminService.checkQuestionUnique(control.value).map((response) => {});
    return new Promise(resolve => {
      this.adminService.checkQuestionUnique(control.value).map(response => {
        const body = response.json();
        if (body.found === false) {
          resolve(null);
        } else {
          resolve({questionUniqueValidator: false});
        }
      });
    });
    // const promise = new Promise(function (resolve, reject) {
      // this.subscription = this.adminService.checkQuestionUnique(control.value).subscribe((response: Response) => {

      // }, (error: any) => {
      //   if (error.status === 401) {
      //     return Promise.reject({questionUniqueValidator: true});
      //   } else {
      //     return Promise.reject(error);
      //   }
      // }, () => {
        
      //   this.subscription.unsubscribe();
      // });
    // });
    // return promise;

  }
}
