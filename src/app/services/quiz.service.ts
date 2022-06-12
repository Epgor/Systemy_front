
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError, of, tap } from 'rxjs';
import { Question } from '../models/question'; 
import { Score } from '../models/score';
import { Quiz } from '../models/quiz';

const httpOptions ={
  'Content-Type': 'application/json',
  observe: 'body' as const,
  responseType: 'json' as const,
}
@Injectable({
  providedIn: 'root'
})

export class QuizService {

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

  getQuestions(quizId: number): Observable<Question[]> {

    let url = `https://localhost:7038/api/quiz/${quizId}/questions`;

    const questions = this.http.get<Question[]>(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    )

    return questions;
  }

  checkAnswers(answers: Question[], quizId: number): Observable<Score>{
    let url = `https://localhost:7038/api/quiz/${quizId}/check`;

    const score = this.http.post<Score>(url, answers ,httpOptions)
    .pipe(
      catchError(this.handleError)
    )

    return score;
  }

  getQuizzes(courseId: number): Observable<Quiz[]>{
    let url = `https://localhost:7038/api/quiz/${courseId}`;

    const quizzes = this.http.get<Quiz[]>(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    )

    return quizzes;
  }

  addQuiz(courseId: number, title: string): Observable<any>{
    let url = `https://localhost:7038/api/quiz/${courseId}`;

    return this.http.post(url, {"text": title},httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteQuiz(quizId: number): Observable<any>{
    let url = `https://localhost:7038/api/quiz/${quizId}`;

    return this.http.delete(url, httpOptions).pipe(catchError(this.handleError));
  }

  getQuiz(id: number): Observable<Quiz>{
    let url = `https://localhost:7038/api/quiz/get/${id}`;

    const quiz = this.http.get<Quiz>(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );

    return quiz;
  }

  editQuiz(quizId: number, qtext: string): Observable<any>{
    let url = `https://localhost:7038/api/quiz/${quizId}`;

    return this.http.put(url, {'text': qtext}, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  addQuestion(quizId: number, question: Question)
  {
    let url = `https://localhost:7038/api/quiz/${quizId}/questions`;
    return this.http.post(url, question, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  
  }

  deleteQuestion(questionId: number)
  {
    let url = `https://localhost:7038/api/quiz/questions/${questionId}`;
    return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  
  }


}
