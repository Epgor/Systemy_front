import { Component, OnInit } from '@angular/core';

import { Course } from '../../models/course';
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

    this.getCourses();
  }
  //zaznaczanie kursu

  //pobieranie listy kursów
  getCourses(): void {
    this.courses = this.courseService.getCourses();
  }
  imageSrc = 'assets/mango.png'; //foto jakby co
  delete(course: Course): void {
    this.courses = this.courses.filter(h => h !== course);
    //pusto poprostu
  }

  add(title: string): void {
    this.courses.push(  {
      "id": 1,
      "title": title,
      "desc": "",
      "logoURL": "",
      "creatorId": 0
    });

    
  }

}
