import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { QuizService } from 'src/app/services/quiz.service';
import { Quiz } from 'src/app/models/quiz';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';
@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit {

  id: number = 0;

  quizList: Quiz[] = [];
  articleList: Article[] = [];


  constructor( private route: ActivatedRoute,
               private quizService: QuizService,
               private location: Location,
               private articleService: ArticleService){ }

  ngOnInit(): void {
    this.id = Number(this.route
      .snapshot.paramMap.get('id'));

      this.quizList = this.quizService.getQuizzes(this.id);

    this.articleList = this.articleService.getArticles(this.id);
  }
  goBack():void{
    this.location.back();
  }


}
