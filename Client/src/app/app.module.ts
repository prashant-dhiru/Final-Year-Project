import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UserService } from './user/user.service';
import { AdminService } from './admin/admin.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NavbarComponent } from './navbar/navbar.component';

import { ExamInputComponent } from './admin/exam-input/exam-input.component';
import { QuestionItemListComponent } from './admin/view-exam/question-item-list.component';
import { QuestionInputComponent } from './admin/question-input/question-input.component';
import { AdminComponent } from './admin/admin.component';
import { ViewExamComponent } from './admin/view-exam/view-exam.component';

import { UserComponent } from './user/user.component';
import { UserSignupComponent } from './user/user-signup/user-signup.component';

import { RouteNotFoundComponent } from './route-not-found/route-not-found.component';
import { ExamComponent } from './exam/exam.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';

import { IsAuthenticatedService } from './Shared/is-authenticated.service';
import { UserMeComponent } from './user/user-me/user-me.component';
import { DummyComponent } from './Playground/dummy/dummy.component';



declare let require: any;

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RouteNotFoundComponent,
    UserSignupComponent,
    ExamInputComponent,
    QuestionItemListComponent,
    QuestionInputComponent,
    ExamComponent,
    UserComponent,
    AdminComponent,
    ViewExamComponent,
    UserLoginComponent,
    AdminLoginComponent,
    UserMeComponent,
    DummyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    UserService,
    AdminService,
    IsAuthenticatedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
