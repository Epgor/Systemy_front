import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-eye-edit',
  templateUrl: './eye-edit.component.html',
  styleUrls: ['./eye-edit.component.css']
})
export class EyeEditComponent implements OnInit {
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

    this.courseService.getCourse(id);
  }

  goBack(): void {
    this.location.back();
  }

}
