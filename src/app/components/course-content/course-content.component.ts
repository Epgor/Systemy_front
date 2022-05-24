import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { QuizService } from 'src/app/services/quiz.service';
import { Quiz } from 'src/app/quiz';
@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit {

  id: number = 0;

  quizList: Quiz[] = [];

  lista = [
    ["1" , "Lekcja 1: Bla bla bla"],
    ["1" , "Lekcja 1: Bla bla bla"],
    ["1" , "Lekcja 1: Bla bla bla"],
    ["1" , "Lekcja 1: Bla bla bla"],
    ["1" , "Lekcja 1: Bla bla bla"],
    ["2" , "text"],
    ["3" , "text"],
    ["4" , "text"],
    ["5" , "text"],
    ["6" , "text"],
    ["7" , "text"],
  ];

  constructor( private route: ActivatedRoute,
               private quizService: QuizService,
               private location: Location){ }

  ngOnInit(): void {
    this.id = Number(this.route
      .snapshot.paramMap.get('id'));
    this.quizService.getQuizzes(this.id)
    .subscribe(response => {
      this.quizList = response;
      console.warn(this.quizList);
    })

  }
  goBack():void{
    this.location.back();
  }


}
