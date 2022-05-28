
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError, of, tap } from 'rxjs';
import { Course } from '../models/course';

const httpOptions ={
  'Content-Type': 'application/json',
  observe: 'body' as const,
  responseType: 'json' as const,
}
@Injectable({
  providedIn: 'root'
})

export class CourseService {

  private _refreshNeeded$ = new Subject<void>();

  get refreashNeeded$() {
    return this._refreshNeeded$;
  }

  private handleError(error: HttpErrorResponse) {

    if (error.status !== 0) {
      
      let responseErrors = Object.entries(error.error.errors)
      .map((x: any) => {return(`${x[1][0]}\n`)});

      let logResp = `${error.name} : ${error.status}\n ${responseErrors}`;
      window.alert(logResp);
    }
    
    return throwError(() => new Error(error.message)  )
  
  }
  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {

    let url = "https://localhost:7038/api/course";

    const courses = this.http.get<Course[]>(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    )

    return courses;
  }

  getCourse(id: number): Observable<Course> {

    let url = `https://localhost:7038/api/course/${id}`;

    const course = this.http.get<Course>(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    )
    
    return course;
  } 
  //temporary solution
  updateCourse(id: number, title: string, desc: string) {
    let url = `https://localhost:7038/api/course/${id}`;
    return this.http.put(url, {'title': title, 'desc': desc},httpOptions)
    .pipe(
        catchError(this.handleError)
    );

  }

  deleteCourse(id: number) {
    let url = `https://localhost:7038/api/course/${id}`;
    return this.http.delete(url,httpOptions)
    .pipe(
        catchError(this.handleError)
    );

  }

  addCourse(title: string): Observable<Course>{

    let url = `https://localhost:7038/api/course/`;

    return this.http.post<Course>(url, {'Title': title},httpOptions)
    .pipe(
      tap(() => {
        this._refreshNeeded$.next(),
        catchError(this.handleError)
      })
    )
  }

  addCourseDetail(mainCourse: number, isEye: boolean, isEar: boolean, isWork: boolean, text: string ){
    let url = '';
    console.warn(`Created ${isEar}|${isEye}|${isWork} for Course: ${mainCourse}, with title ${text}`)
  }
}
