import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fyp-view-exam',
  templateUrl: './view-exam.component.html'
})
export class ViewExamComponent implements OnInit {

  isSubmissionFailure = -1;
  examViewForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.initExamViewForm();
  }

  initExamViewForm () {
    this.examViewForm = new FormGroup({
      'examID': new FormControl('', [
        Validators.required,
        Validators.minLength(24),
        Validators.maxLength(24),
        Validators.pattern('^[a-fA-F0-9]+$')
      ])
    });
  }

  onSubmit() {
    if (this.isAdminAuthenticated()) {
      return this.isSubmissionFailure = 1;
    }
    // redirect user to route with appropriate exam ID in place
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

  resetIsSubmissionFailure () {
    this.isSubmissionFailure = -1;
  }

}
