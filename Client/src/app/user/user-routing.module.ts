import { Routes } from '@angular/router';

import { UserSignupComponent } from './user-signup/user-signup.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserMeComponent } from './user-me/user-me.component';

export const USER_ROUTES: Routes = [
    { path: '', component: UserMeComponent },
    { path: 'signup', component: UserSignupComponent },
    { path: 'login', component: UserLoginComponent }
];
