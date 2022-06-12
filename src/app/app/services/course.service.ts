
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
//sztuczna lista, niby z serwera, żebyś mogła się bawić
  kursy: Course[] =
[
  {
    "id": 1,
    "title": "Wprowadzający HTML",
    "desc": "Kurs wprowadzający w temat HTML",
    "logoURL": "src/app/services/mango.png",
    "creatorId": 0
  },
  {
    "id": 2,
    "title": "Wprowadzający CSS",
    "desc": "Kurs wprowadzający w temat CSS",
    "logoURL": "https://localhost:7038/image/image5.jpg",
    "creatorId": 0
  },
  {
    "id": 3,
    "title": "Wprowadzający JS",
    "desc": "Kurs wprowadzający w temat JavaScript",
    "logoURL": "https://localhost:7038/image/image6.jpg",
    "creatorId": 0
  },
  {
    "id": 4,
    "title": "Podstawy HTML",
    "desc": "Kurs rozwijający temat HTML",
    "logoURL": "",
    "creatorId": 0
  },
  {
    "id": 5,
    "title": "Podstawy CSS",
    "desc": "Kurs rozwijający temat CSS",
    "logoURL": "",
    "creatorId": 0
  },
  {
    "id": 6,
    "title": "Podstawy JS",
    "desc": "Kurs rozwijający temat JavaScript",
    "logoURL": "",
    "creatorId": 0
  },
  {
    "id": 7,
    "title": "Podstawy cz.2 HTML",
    "desc": "Kurs rozwijający temat HTML",
    "logoURL": "",
    "creatorId": 0
  },
  {
    "id": 8,
    "title": "Podstawy cz.2 CSS",
    "desc": "Kurs rozwijający temat CSS",
    "logoURL": "",
    "creatorId": 0
  },
  {
    "id": 9,
    "title": "Podstawy cz.2 JS",
    "desc": "Kurs rozwijający temat JavaScript",
    "logoURL": "",
    "creatorId": 0
  },
  {
    "id": 10,
    "title": "Zaawansowany HTML",
    "desc": "Kurs rozwijający wiedzę z zakresu HTML",
    "logoURL": "",
    "creatorId": 0
  },
  {
    "id": 11,
    "title": "Zaawansowany CSS",
    "desc": "Kurs rozwijający wiedzę z zakresu CSS",
    "logoURL": "",
    "creatorId": 0
  },

];


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

  getCourses(): Course[] {

    return this.kursy;
  }

  getCourse(id: number): Course {


    return this.kursy[1];
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
