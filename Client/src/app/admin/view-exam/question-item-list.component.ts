import { Component, OnInit, Input } from '@angular/core';

import { Question } from '../../Classes/question';

@Component({
  selector: 'fyp-question-item-list',
  templateUrl: './question-item-list.component.html'
})
export class QuestionItemListComponent implements OnInit {

  @Input() question: Question;
  @Input() questionId: number;

  constructor() { }

  ngOnInit() {
    console.log(this.questionId);
  }

}
