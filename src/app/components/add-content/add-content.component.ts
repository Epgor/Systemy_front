import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {

  @Input() course?: Course;

  article: Article = {
    id : 0,
    text : "",
    learningType : 0
  }

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private location: Location,
    private articleService: ArticleService
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
    {
      let typ = 0;
      if(this.isEye)
        typ += 4;
      if(this.isEar)
        typ += 2;
      if(this.isWork)
        typ += 1;

      this.article.learningType = typ;
      this.article.text = this.text;

      this.articleService.addArticle(
        this.course.id, this.article).subscribe(
          r => this.goBack()
        );
    }

  }

}
