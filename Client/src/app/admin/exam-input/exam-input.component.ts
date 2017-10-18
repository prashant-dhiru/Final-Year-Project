import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';

import { Question } from '../../Classes/question';
import { AdminService } from '../admin.service';

@Component({
  selector: 'fyp-exam-input',
  templateUrl: './exam-input.component.html'
})
export class ExamInputComponent implements OnInit {
  
  examForm: FormGroup;
  submissionError = 0;
  subscription: Subscription;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.examFormInit();
  }

  examFormInit () {
    this.examForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),
      'description': new FormControl('', Validators.maxLength(500)),
      'allowedTime': new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(3)
      ]),
      'subject': new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ])
    });
  }

  onSubmit () {
    if (this.isAdminAuthenticated()) {
      return this.submissionError = 1;
    }
    this.subscription = this.adminService.createExam(this.examForm.value).subscribe((response: Response) => {
      this.submissionError = 0;
      // redirect to view exam component with examid
    }, (error: any) => {
      if (error.status === 401) {
        this.submissionError = 1;
      } else {
        this.submissionError = 2;
      }
      // 401 unauthenticated
      // 500 internal server error
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

  resetSubmissionError () {
    this.submissionError = 0;
  }
}
