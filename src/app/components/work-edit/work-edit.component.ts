import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-work-edit',
  templateUrl: './work-edit.component.html',
  styleUrls: ['./work-edit.component.css']
})
export class WorkEditComponent implements OnInit {

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
}
