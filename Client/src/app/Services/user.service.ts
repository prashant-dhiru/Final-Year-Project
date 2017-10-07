import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';

import {User} from '../Classes/user';

@Injectable()
export class UserService {

  constructor(private http: Http) {}

  checkEmailUnique (email: string) {
    return this.http.post('http://localhost:3000/user/email', {email}).map(res => res.json());
  }

  registerUser (user: User) {
    return this.http.post('http://localhost:3000/user/signup', user).map(res => res.json());
  }

  loginUser (body: any) {
    return this.http.post('http://localhost:3000/user/login', body).map(res => res.json());
  }

  logoutuser () {
    return this.http.delete('http://localhost:3000/user/login').map(res => res.json());
  }

  getUser () {
    return this.http.get('http://localhost:3000/user/me').map(res => res.json());
  }

}
