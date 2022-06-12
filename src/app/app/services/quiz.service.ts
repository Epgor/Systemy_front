
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError, of, tap } from 'rxjs';
import { Question } from '../models/question'; 
import { Score } from '../models/score';
import { Quiz } from '../models/quiz';
import { Answer } from '../models/answer';

const httpOptions ={
  'Content-Type': 'application/json',
  observe: 'body' as const,
  responseType: 'json' as const,
}
@Injectable({
  providedIn: 'root'
})

export class QuizService {
  //sztuczne quizyt
  quizy: Quiz[] = [
    {
      "id": 1,
      "text": "Mój Pierwszy Quiz HTML",
      "learningType": 0
    },
    {
      "id": 2,
      "text": "Mój Drugi Quiz HTML",
      "learningType": 0
    },
    {
      "id": 3,
      "text": "Mój trzeci Quiz HTML",
      "learningType": 0
    }
  ]
  pytanka: Question[] = [
    {
      "questionText": "Pierwsze pytanie HTML q1Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus. Praeterea iter est quasdam res quas ex communi. At nos hinc posthac, sitientis piros Afros. Petierunt uti sibi concilium totius Galliae in diem certam indicere. Cras mattis iudicium purus sit amet fermentum.",
      "answers": [
        {
          "text": "Dobra odpowiedz 1/1",

        },
        {
          "text": "Zla odpowiedz 1/2",

        },
        {
          "text": "Dobra odpowiedz 1/3",

        },
        {
          "text": "Zla odpowiedz 1/4",

        },
        {
          "text": "Dobra odpowiedz 1/5",

        }
      ]
    },
    {
      "questionText": "Drugie pytanie HTML q1",
      "answers": [
        {
          "text": "Dobra odpowiedz 2/1",

        },
        {
          "text": "Zla odpowiedz 2/2",

        },
        {
          "text": "Dobra odpowiedz 2/3",

        },
        {
          "text": "Zla odpowiedz 2/4",

        }
      ]
    },
    {
      "questionText": "Trzecie pytanie HTML q1",
      "answers": [
        {
          "text": "Dobra odpowiedz 3/1",

        },
        {
          "text": "Zla odpowiedz 3/2",

        },
        {
          "text": "Dobra odpowiedz 3/3",
       }
      ]
    
    }
  ]

  wynik: Score = {
    score : 10,
    maxScore : 10,
  }

  private _refreshNeeded$ = new Subject<void>();

  get refreashNeeded$() {
    return this._refreshNeeded$;
  }

  private handleError(error: HttpErrorResponse) {

    if (error.status !== 0) {
      
      let responseErrors = Object.entries(error.error.errors)
      .map((x: any) => {return(`${x[1][0]}\n`)});

      let logResp = `${error.name} : ${error.status}\n ${responseErrors}`;
      window.alert(logResp);
    }
    
    return throwError(() => new Error(error.message)  )
  
  }
  constructor(private http: HttpClient) { }

  getQuestions(quizId: number): Question[] {


    return this.pytanka;
  }

  checkAnswers(answers: Question[], quizId: number): Score{


    return this.wynik;
  }

  getQuizzes(courseId: number): Quiz[]{

    return this.quizy;
  }

}
