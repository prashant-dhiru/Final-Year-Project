import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class UserService {

  constructor(private http: Http) {}

  checkEmailUnique (email: string) {
    console.log('Inside the service');
    return this.http.post('http://localhost:3000/user/email', {email}).map(res => res.json());
  }

}
