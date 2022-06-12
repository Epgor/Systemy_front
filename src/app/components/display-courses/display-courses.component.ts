import { Component, OnInit } from '@angular/core';

import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-display-courses',
  templateUrl: './display-courses.component.html',
  styleUrls: ['./display-courses.component.css']
})
export class DisplayCoursesComponent implements OnInit {

  courses: Course[] = [];
  isChecked: boolean = false;
  //wstrzykujemy serwis kursów
  constructor(private courseService: CourseService,
    private loginService: LoginService) { }
  //init komponentu
  ngOnInit(): void {
    this.courseService.refreashNeeded$
    .subscribe(() => {
      this.getCourses();
    })
    this.getCourses();
  }
  //zaznaczanie kursu

  //pobieranie listy kursów
  getCourses(): void {
    this.courseService.getCourses()
        .subscribe(courses => this.courses = courses);
  }

  delete(course: Course): void {
    this.courses = this.courses.filter(h => h !== course);
    this.courseService.deleteCourse(course.id).subscribe();
  }

  add(title: string): void {
    title = title.trim();
    if (!title) {return;}
    this.courseService.addCourse(title).subscribe();

  }

  imAdmin(): boolean
  {
    if(this.loginService.getRole() == 'Admin')
      return true
    return false
  }



}
