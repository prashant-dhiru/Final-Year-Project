import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Question } from '../../Classes/question';

@Component({
  selector: 'fyp-exam-input',
  templateUrl: './exam-input.component.html'
})
export class ExamInputComponent implements OnInit {
  
  examForm: FormGroup;
  isSubmitted = false;

  constructor() { }

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
    this.isSubmitted = true;
    // redirect to exam:id
  }

}
