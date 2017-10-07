import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Question } from '../../Classes/question';

@Component({
  selector: 'fyp-exam-input',
  templateUrl: './exam-input.component.html'
})
export class ExamInputComponent implements OnInit {

  questions: Question[] = [];
  
  examForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.examFormInit();
  }

  examFormInit () {
    this.examForm = new FormGroup({
      'name': new FormControl(''),
      'description': new FormControl(''),
      'allowedTime': new FormControl(''),
      'subject': new FormControl(),
      'questions': new FormArray([])
    });
  }

  addNewQuestionInArray(question: Question) {
    this.questions.push(question);
  }

}
