import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { User } from '../Classes/user';

@Injectable()
export class UserService {

  constructor(private http: Http) {}

  checkEmailUnique (email: string): Observable<Response> {
    return this.http.post('http://localhost:3000/user/email', {email}, { withCredentials: true });
  }

  registerUser (user: User): Observable<Response> {
    return this.http.post('http://localhost:3000/user/signup', user, { withCredentials: true });
  }

  loginUser (body: any): Observable<Response> {
    return this.http.post('http://localhost:3000/user/login', body, { withCredentials: true });
  }

  logoutuser (): Observable<Response> {
    return this.http.delete('http://localhost:3000/user/logout', { withCredentials: true });
  }

  getUser (): Observable<Response> {
    return this.http.get('http://localhost:3000/user/me', { withCredentials: true });
  }

  getAuthStatus (): Observable<Response> {
    return this.http.get('http://localhost:3000/authstatus', { withCredentials: true });
  }

}