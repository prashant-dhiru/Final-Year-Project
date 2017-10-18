import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import {Exam} from '../Classes/exam';
import {Question} from '../Classes/question';

@Injectable()
export class AdminService {

  constructor(private http: Http) {}

  loginAdmin (password: string): Observable<Response> {
    return this.http.post('http://localhost:3000/admin/login', {password}, { withCredentials: true });
  }

  checkAdminAuthenticated (): Observable<Response> {
    return this.http.get('http://localhost:3000/admin/me', { withCredentials: true });
  }

  logoutAdmin (): Observable<Response> {
    return this.http.delete('http://localhost:3000/admin/logout', { withCredentials: true });
  }

  createExam (exam: Exam): Observable<Response> {
    return this.http.post('http://localhost:3000/admin/createExam', exam, { withCredentials: true });
  }

  putQuestionIntoExam (question: Question): Observable<Response> {
    return this.http.post('http://localhost:3000/admin/exam/:id/insertque', question, { withCredentials: true });
  }

  checkExam (id: string): Observable<Response> {
    return this.http.get('http://localhost:3000/admin/exam/:id', { withCredentials: true });
  }

  checkQuestionUnique (questionBody: string): Observable<Response> {
    return this.http.post('http://localhost:3000/admin/question', {questionBody}, { withCredentials: true });
  }

}
