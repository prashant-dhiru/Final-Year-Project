import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';

import {Observable} from 'rxjs/Rx';
import {Exam} from '../Classes/exam';
import {Question} from '../Classes/question';

@Injectable()
export class AdminService {

  constructor(private http: Http) {}

  loginAdmin (password: string): Observable<Response> {
    return this.http.post('http://localhost:3000/admin/login', {password});
  }

  checkAdminAuthenticated (): Observable<Response> {
    return this.http.get('http://localhost:3000/admin/me').map(res => res.json());
  }

  logoutAdmin (): Observable<Response> {
    return this.http.delete('http://localhost:3000/admin/logout').map(res => res.json());
  }

  createExam (exam: Exam): Observable<Response> {
    return this.http.post('http://localhost:3000/admin/createExam', exam).map(res => res.json());
  }

  putQuestionIntoExam (question: Question): Observable<Response> {
    return this.http.post('http://localhost:3000/admin/exam/:id/insertque', question).map(res => res.json());
  }

  checkExam (id: string): Observable<Response> {
    return this.http.get('http://localhost:3000/admin/exam/:id').map(res => res.json());
  }

}
