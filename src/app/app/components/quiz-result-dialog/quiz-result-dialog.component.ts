import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Score } from 'src/app/models/score';
@Component({
  selector: 'app-quiz-result-dialog',
  templateUrl: './quiz-result-dialog.component.html',
  styleUrls: ['./quiz-result-dialog.component.css']
})
export class QuizResultDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {result: string}) {}

  ngOnInit(): void {
  }

}
