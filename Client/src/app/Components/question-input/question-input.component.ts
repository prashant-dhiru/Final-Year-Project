import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Question } from '../../Classes/question';

@Component({
  selector: 'fyp-question-input',
  templateUrl: './question-input.component.html',
  styles: []
})
export class QuestionInputComponent implements OnInit {

  public questionItemForm: FormGroup;

  constructor() {}
  
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
    console.log(this.questionItemForm.value);
  }

}



