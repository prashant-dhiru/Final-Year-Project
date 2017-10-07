import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UserService } from './Services/user.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { RouteNotFoundComponent } from './Components/route-not-found/route-not-found.component';
import { UserSignupComponent } from './Components/user-signup/user-signup.component';
import { ExamInputComponent } from './Components/exam-input/exam-input.component';
import { QuestionItemListComponent } from './Components/question-item-list/question-item-list.component';
import { QuestionInputComponent } from './Components/question-input/question-input.component';

declare let require: any;

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RouteNotFoundComponent,
    UserSignupComponent,
    ExamInputComponent,
    QuestionItemListComponent,
    QuestionInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
