import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { AdminService } from '../admin.service';
import { IsAuthenticatedService } from '../../Shared/is-authenticated.service';
import { Question } from '../../Classes/question';

@Component({
  selector: 'fyp-exam-input',
  templateUrl: './exam-input.component.html',
  styleUrls: ['./exam-input.component.css']
})
export class ExamInputComponent implements OnInit {

  examForm: FormGroup;
  submissionError = 0;
  subscription: Subscription;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private isAuthenticatedService: IsAuthenticatedService
  ) { }

  ngOnInit() {
    this.examForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        this.containsNoSpaceValidator
      ]),
      'description': new FormControl('', [
        Validators.maxLength(500),
        this.containsNoSpaceValidator
      ]),
      'allowedTime': new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(3),
        Validators.pattern('^[0-9]+$')
      ]),
      'subject': new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        this.containsNoSpaceValidator
      ])
    });
  }

  onSubmit () {
    this.subscription = this.adminService.createExam(this.examForm.value).subscribe((response: Response) => {
      this.submissionError = 0;
      this.router.navigate(['admin', 'exam', response.json()._id, 'insertque']);
    }, (error: any) => {
      if (error.status === 401) {
        this.submissionError = 1;
        // 401 unauthenticated
      } else {
        this.submissionError = 2;
        // 500 internal server error
      }
    }, () => {
      this.subscription.unsubscribe();
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
