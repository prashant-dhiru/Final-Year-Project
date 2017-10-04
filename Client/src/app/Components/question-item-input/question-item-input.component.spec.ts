import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionItemInputComponent } from './question-item-input.component';

describe('QuestionItemInputComponent', () => {
  let component: QuestionItemInputComponent;
  let fixture: ComponentFixture<QuestionItemInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionItemInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionItemInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
