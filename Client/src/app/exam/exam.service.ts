import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ExamService {

  constructor(private http: Http) { }

  getExamList (): Observable<Response> {
    return this.http.get('http://localhost:3000/exam', { withCredentials: true });
  }

  getExam (id: string): Observable<Response> {
    return this.http.get('http://localhost:3000/exam/' + id, { withCredentials: true });
  }

  submitExam (id: string, exam: any): Observable<Response> {
    return this.http.post('http://localhost:3000/exam/submit/' + id, exam, { withCredentials: true });
  }

  getExamQuickResult (id: string): Observable<Response> {
    return this.http.get('http://localhost:3000/exam/quick/' + id, { withCredentials: true });
  }

  getExamResult (id: string): Observable<Response> {
    return this.http.get('http://localhost:3000/exam/result/' + id, { withCredentials: true });
  }

}
