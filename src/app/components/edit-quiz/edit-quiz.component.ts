import { Component, OnInit, Input } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Article } from 'src/app/models/article';
import { Quiz } from 'src/app/models/quiz';
@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css']
})
export class EditQuizComponent implements OnInit {

  @Input() quiz?: Quiz;
  id: number = 0;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.getQuiz();
  }
  getQuiz(): void {
    this.id = Number(this.route
      .snapshot.paramMap.get('id'));

    this.quizService.getQuiz(this.id).subscribe(
      resp => {this.quiz = resp}
    );
  }

  goBack(): void {
    this.location.back();
  }
 

  save(): void{
    if(this.quiz)
      this.quizService.editQuiz(this.id, this.quiz.text).subscribe(r => this.goBack())
  }

}
