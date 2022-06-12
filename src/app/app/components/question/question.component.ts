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
  isCompleted: boolean = false;
  points: number = 0;
  maxPoints: number = 0;
  checkColor = 'primary';
  PytaniaTest: Question[] = [];
  questionIndex: number = 0;
  quizId: number = 1;

  constructor(
    private quizService: QuizService,
    public dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {

    this.PytaniaTest =this.quizService.getQuestions(this.quizId);
  }

  checkAnswer(){
    
    this.score = this.quizService.checkAnswers(this.PytaniaTest, this.quizId);

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
    this.isCompleted = true; 

  }
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
}

