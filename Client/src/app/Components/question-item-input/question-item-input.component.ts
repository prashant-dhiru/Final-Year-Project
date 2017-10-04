import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { QuestionItem } from '../../Classes/question-item';

// const {lodash} = require('lodash');

@Component({
  selector: 'fyp-question-item-input',
  templateUrl: './question-item-input.component.html'
})
export class QuestionItemInputComponent implements OnInit {

  questionItemForm: FormGroup;

  constructor() {
    this.questionItemForm = new FormGroup({
      'body': new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000)
      ]),
      'answerOptions': new FormArray([]),
      'correctAnswer': new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(100),
        Validators.required
      ]),
      'marksForCorrectAnswer': new FormControl('4', [
        Validators.required, Validators.maxLength(2)
      ]),
      'negativeMark': new FormControl('1', [
        Validators.required, Validators.maxLength(2)
      ]),
      'difficulty': new FormControl('', [
        Validators.min(1),
        Validators.max(5),
        Validators.maxLength(1)
      ])

    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.questionItemForm);
  }

  onAddAnswerOption (optionText: String) {
    (<FormArray>this.questionItemForm.controls.answerOptions).push(new FormControl(optionText, [
      Validators.minLength(1),
      Validators.maxLength(100),
      Validators.required
    ]));
  }

  onRemoveAnswerOption (index: number) {
    (<FormArray>this.questionItemForm.controls.answerOptions).removeAt(index);
  }

}
