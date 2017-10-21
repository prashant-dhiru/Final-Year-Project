import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Question } from '../../../Classes/question';

@Component({
  selector: 'fyp-exam-question-item',
  templateUrl: './exam-question-item.component.html',
  styles: []
})
export class ExamQuestionItemComponent implements OnInit {

  @Input () question: Question;
  @Input () questionId: number;

  @Output() answerSubmitted = new EventEmitter<any>();

  // question = {
  //   body: 'This is question body',
  //   answerOptionOne: 'option 1',
  //   answerOptionTwo: 'option 2',
  //   answerOptionThree: 'option 3',
  //   answerOptionFour: 'option 4',
  //   correctAnswer: 'option 1',
  //   marksForCorrectAnswer: 4,
  //   negativeMark: 1,
  //   difficulty: 3,
  //   _id: 'as1234567890asas12345678',
  //   __v: 0
  // };
  // questionId = 1;

  constructor() { }

  ngOnInit() {
  }

  submitAnswer() {
    this.answerSubmitted.emit({
      question: this.question._id,
      questionId: this.questionId
    });
  }

  

}
