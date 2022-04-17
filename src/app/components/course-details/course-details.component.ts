import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Course } from '../../course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  @Input() course?: Course;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse(): void {
    const id = Number(this.route
      .snapshot.paramMap.get('id'));

    this.courseService.getCourse(id)
      .subscribe(course => this.course = course);
  }

  goBack(): void {
    this.location.back();
  }

  save(course: Course): void {
    if (this.course) {
      /*
      this.courseService.updateCourse(this.course)
        .subscribe(() => this.goBack());
        */
       this.courseService.updateCourse(course.id, course.title, course.description);
       this.goBack();
    }
  }

}
