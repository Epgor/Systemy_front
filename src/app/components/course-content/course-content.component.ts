import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { QuizService } from 'src/app/services/quiz.service';
import { Quiz } from 'src/app/models/quiz';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';
import { faCoffee, faPenToSquare, faTrashCan} from '@fortawesome/free-solid-svg-icons'; //super czcionki
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit {

  id: number = 0;
  isChecked: boolean = false;

  nowyQuiz: Quiz  = {
    id:0,
    text: "",
    learningType: 0,
  };

  quizList: Quiz[] = [];
  articleList: Article[] = [];
  faCoffee = faCoffee;
  faEdit = faPenToSquare;
  faDelete = faTrashCan;
  //kolumny do tabelki 
  displayedColumns: string[] = [
    'id',
    'quiz',
    'actionDel',
    'actionEdit'];

  displayedColumns2: string[] = [
      'id',
      'quiz',
      'actionDel',
      'actionEdit'];
  


  constructor( private route: ActivatedRoute,
               private quizService: QuizService,
               private location: Location,
               private articleService: ArticleService,
               private loginService: LoginService){ }

  ngOnInit(): void {
    this.id = Number(this.route
      .snapshot.paramMap.get('id'));

    this.quizService.getQuizzes(this.id)
    .subscribe(response => {
      this.quizList = response;
      //console.warn(this.quizList);
    })

    this.articleService.getArticles(this.id)
    .subscribe(resp => {
      this.articleList = resp;
    })
  }
  goBack():void{
    this.location.back();
  }
  delete(id: number)
  {
    this.quizService.deleteQuiz(id).subscribe(
      r =>
      {
        window.location.reload();
      }
    )
  }

  deleteArticle(id: number)
  {
    this.articleService.deleteArticle(id).subscribe(      
      r =>
      {
        window.location.reload();
      }
    )
    
    
  }

  addQuiz(name: string)
  {
    this.quizService.addQuiz(this.id, name).subscribe(
      response =>
      {
        this.nowyQuiz.text = name;
        this.quizList.push(this.nowyQuiz);
        window.location.reload();
      }    
    );
  }

  imAdmin(): boolean
  {
    if(this.loginService.getRole() == 'Admin')
      return true
    return false
  }

}
