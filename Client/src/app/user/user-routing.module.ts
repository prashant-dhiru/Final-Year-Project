import { Routes } from '@angular/router';

import { UserLoginComponent } from './user-login/user-login.component';
import { UserMeComponent } from './user-me/user-me.component';
import { UserSignupComponent } from './user-signup/user-signup.component';

export const USER_ROUTES: Routes = [
    { path: '', component: UserMeComponent },
    { path: 'signup', component: UserSignupComponent },
    { path: 'login', component: UserLoginComponent }
];
