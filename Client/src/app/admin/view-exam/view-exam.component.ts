import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'fyp-view-exam',
  templateUrl: './view-exam.component.html'
})
export class ViewExamComponent implements OnInit {

  viewComponent = 0;

  examViewForm: FormGroup;

  constructor(private router: Router) { }

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

  onInputQuestionsIntoExam () {
    this.router.navigate(['exam', this.examViewForm.controls.examID.value, 'insertque']);
    this.viewComponent = 1;
  }

  onViewExam () {
    this.router.navigate(['exam', this.examViewForm.controls.examID.value]);
    this.viewComponent = 2;
  }

}
