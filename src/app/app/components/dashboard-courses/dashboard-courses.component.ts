import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service'; 
import { Course } from '../../models/course';

@Component({
  selector: 'app-dashboard-courses',
  templateUrl: './dashboard-courses.component.html',
  styleUrls: ['./dashboard-courses.component.css']
})
export class DashboardCoursesComponent implements OnInit {

  courses: Course[] = [];
  imageSrc = 'assets/mango.png';
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.courses = this.courseService.getCourses().slice(0,3);

    
  }

}
