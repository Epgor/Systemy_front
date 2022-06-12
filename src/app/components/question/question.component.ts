import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Answer } from 'src/app/models/answer';
import { QuizService } from 'src/app/services/quiz.service';
import { Question } from '../../models/question';
import { Score } from 'src/app/models/score';
import { MatDialog } from '@angular/material/dialog';
import { QuizResultDialogComponent } from '../quiz-result-dialog/quiz-result-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  score: Score = {
    score: 0,
    maxScore: 0
  }
  isChecked: boolean = false;
  isCompleted: boolean = false;
  points: number = 0;
  maxPoints: number = 0;
  checkColor = 'primary';
  PytaniaTest: Question[] = [];
  pytanieTemp: Question ={
    questionText: '',
    answers: []
  }
  answerTemp: Answer ={
    text: '',
    IsChecked: false
  }
  questionIndex: number = 0;
  quizId: number = 1;

  constructor(
    private quizService: QuizService,
    public dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    //this.addAnswer({"text":"some"});
    //this.PytaniaTest.push(this.question1);
    //this.PytaniaTest.push(this.question2);
    //console.warn(this.PytaniaTest);
    this.quizId = Number(this.route
      .snapshot.paramMap.get('id'));

    this.quizService.getQuestions(this.quizId)
    .subscribe(response => {
      this.PytaniaTest = response;
      //console.warn(this.PytaniaTest);
    });
  }

  checkAnswer(){
    
    this.quizService.checkAnswers(this.PytaniaTest, this.quizId).subscribe(
      response => {
        //console.warn(response);
        this.score = response;
        //console.warn(this.PytaniaTest);
        //console.warn(this.score);
        let x = document.getElementById("wynik");
        if (x != null)
        {
          let percent: number = (this.score.score/this.score.maxScore*100);
          let percentF = percent.toFixed(2);
          x.innerHTML=`Twój wynik to: ${this.score.score}/${this.score.maxScore} | ${percentF}%`;
          this.dialog.open(QuizResultDialogComponent, {
            data: {
              result: percentF
            }

        });
        }
        
        //document.getElementById("wynik")?.innerHTML= "Twój wynik to: {{this.score.Score}}/{{this.score.MaxScore}}";
        //let wynik = this.score.Score / this.score.MaxScore;
        //console.warn(this.score.Score);
      }
    );
    this.isCompleted = true; 

  }

  next(): void{
    if (this.questionIndex < this.PytaniaTest.length)
      this.questionIndex ++;

  }
  previous(): void{
    if (this.questionIndex == 0)
      return
    this.questionIndex --;
  }
  openDialog(): void{
    this.dialog.open(QuizResultDialogComponent);
  }

  goBack():void{
    this.location.back();
  }

  
  imAdmin(): boolean
  {
    if(this.loginService.getRole() == 'Admin')
      return true
    return false
  }

  addQuestion(){
    //console.warn(this.pytanieTemp);
    this.quizService.addQuestion(this.quizId, this.pytanieTemp).subscribe(
      r => window.location.reload()
      );
  }

  modifyQuestion(){
    console.warn(this.PytaniaTest[this.questionIndex].questionId, this.pytanieTemp);
  }

  deleteQuestion(id: number)
  {
    //console.warn(id);
    this.quizService.deleteQuestion(id).subscribe(
      r => window.location.reload()
      );
  }
}

