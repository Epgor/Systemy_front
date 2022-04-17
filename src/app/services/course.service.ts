
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from '../course';
import { Courses } from '../mock-course';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor() { }

  getCourses(): Observable<Course[]> {
    const courses = of(Courses);
    return courses;
  }

  getCourse(id: number): Observable<Course> {
    //what if id does not exist
    //to do: error handlig
    const course = Courses.find(h => h.id === id)!;
    
    return of(course);
  } 
  //temporary solution
  updateCourse(id: number, title: string, desc: string): void {
    const course = Courses.find(h => h.id === id)!;
    course.description = desc;
    course.title = title;
  }

  deleteCourse(id: number): void {
    delete Courses[id];
  }

  addCourse(title: string): void {
    const newCourse = {id: 9999, title: title, description: '', logo: ''};
    Courses.push(newCourse);
  }
}
