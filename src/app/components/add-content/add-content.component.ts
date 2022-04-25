import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Course } from '../../course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {

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

}
