import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  qid: number = 0;
  id: number = 0;
  Pytanie = ["1", "Które fragmenty kodu zwócą wartość 'true'"];
  Odpowiedzi = ["1 == 1", "1 == 2", "1=='1'", "1==='1'"];
  Pytania = [
    ["nr.1" , "I Które fragmenty kodu zwócą wartość 'true'"],
    ["nr.2" , "II Które fragmenty kodu zwócą wartość 'true'"],
    ["nr.3" , "III Które fragmenty kodu zwócą wartość 'true'"],
    ["nr.4" , "IV Które fragmenty kodu zwócą wartość 'true'"],
  ];

  constructor( private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.route
      .snapshot.paramMap.get('id'));
    console.log(this.Pytania)
  }

}
