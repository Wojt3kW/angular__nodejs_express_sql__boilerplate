import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentSubject } from '../models/subject.enum';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseUrl = 'http://localhost:3000';

  public constructor(private http: HttpClient) {}

  public getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/students`);
  }

  public getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/students/${id}`);
  }

  public addStudent(student: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/students`, student);
  }

  public deleteStudent(id: number | null): Observable<any> {
    return this.http.delete(`${this.baseUrl}/students/${id}`);
  }

  public updateMark(
    studentId: number,
    mark: number | null,
    subject: StudentSubject
  ): Observable<any> {
    if (Number.isInteger(mark)) {
      return this.http.put(
        `${this.baseUrl}/students/${subject}/${studentId}/${mark}`,
        {}
      );
    } else {
      return this.http.put(
        `${this.baseUrl}/students/${subject}/${studentId}`,
        {}
      );
    }
  }
}
