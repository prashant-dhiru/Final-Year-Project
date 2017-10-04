import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { RouteNotFoundComponent } from './Components/route-not-found/route-not-found.component';
import { UserSignupComponent } from './Components/user-signup/user-signup.component';
import { QuestionItemInputComponent } from './Components/question-item-input/question-item-input.component';
import { QuestionListComponent } from './Components/question-list/question-list.component';
import { QuestionListItemComponent } from './Components/question-list-item/question-list-item.component';

declare let require: any;

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RouteNotFoundComponent,
    UserSignupComponent,
    QuestionItemInputComponent,
    QuestionListComponent,
    QuestionListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
