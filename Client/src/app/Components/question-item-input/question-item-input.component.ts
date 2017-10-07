import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { Question } from '../../Classes/question';

@Component({
  selector: 'fyp-question-item-input',
  templateUrl: './question-item-input.component.html'
})
export class QuestionItemInputComponent implements OnInit {

  public questionItemForm: FormGroup;
  answerOptionCount = 0;

  @Output() questionSubmitted = new EventEmitter();

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

  onSubmit() {
    this.questionSubmitted.emit(this.questionItemForm.value);
  }

  onAddAnswerOption (optionText: String) {
    (<FormArray>this.questionItemForm.controls.answerOptions).push(new FormControl(optionText, [
      Validators.minLength(1),
      Validators.maxLength(100),
      Validators.required
    ]));
    this.answerOptionCount++;
  }

  onRemoveAnswerOption (index: number) {
    (<FormArray>this.questionItemForm.controls.answerOptions).removeAt(index);
    this.answerOptionCount--;
  }

}
