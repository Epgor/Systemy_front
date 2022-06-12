import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-edition-main',
  templateUrl: './course-edition-main.component.html',
  styleUrls: ['./course-edition-main.component.css']
})
export class CourseEditionMainComponent implements OnInit {
  @Input() course?: Course;
  title: string = "Wybierz ścieżkę do edycji";
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
  
      this.course = this.courseService.getCourse(id);
    }
  
    goBack(): void {
      this.location.back();
    }
}
