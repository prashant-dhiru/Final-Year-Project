import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';

import {User} from '../Classes/user';

@Injectable()
export class UserService {

  constructor(private http: Http) {}

  checkEmailUnique (email: string) {
    return this.http.post('http://localhost:3000/user/email', {email});
  }

  registerUser (user: User) {
    return this.http.post('http://localhost:3000/user/signup', user);
  }

  loginUser (body: any) {
    return this.http.post('http://localhost:3000/user/login', body);
  }

  logoutuser () {
    return this.http.delete('http://localhost:3000/user/login');
  }

  getUser () {
    return this.http.get('http://localhost:3000/user/me');
  }

}
