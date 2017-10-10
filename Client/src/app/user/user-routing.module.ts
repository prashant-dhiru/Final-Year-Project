import { Routes } from '@angular/router';

import { UserSignupComponent } from './user-signup/user-signup.component';
import { UserLoginComponent } from './user-login/user-login.component';

export const USER_ROUTES: Routes = [
    { path: '', component: UserLoginComponent },
    { path: 'signup', component: UserSignupComponent },
    { path: 'login', component: UserLoginComponent }
];
