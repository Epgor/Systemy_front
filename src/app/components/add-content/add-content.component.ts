import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Course } from '../../models/course';
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

  text: string = "";
  isEye: boolean = false;
  isEar: boolean = false;
  isWork: boolean = false;
  

  ngOnInit(): void {
    this.getCourse();
  }
  
  goBack(): void {
    this.location.back();
  }
  getCourse(): void {
    const id = Number(this.route
      .snapshot.paramMap.get('id'));

    this.courseService.getCourse(id)
      .subscribe(course => this.course = course);
  }

  create(){
    if (this.course)
      this.courseService.addCourseDetail(
        this.course.id, this.isEye, this.isEar, this.isWork, this.text);
  }

}
