import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  id: number = 0;


  constructor( private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.route
      .snapshot.paramMap.get('id'));

  }

}
