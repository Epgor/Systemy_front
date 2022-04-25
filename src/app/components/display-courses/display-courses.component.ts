import { Component, OnInit } from '@angular/core';

import { Course } from '../../course';
import { CourseService } from '../../services/course.service'

@Component({
  selector: 'app-display-courses',
  templateUrl: './display-courses.component.html',
  styleUrls: ['./display-courses.component.css']
})
export class DisplayCoursesComponent implements OnInit {

  courses: Course[] = [];
  //wstrzykujemy serwis kursów
  constructor(private courseService: CourseService) { }
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

}
