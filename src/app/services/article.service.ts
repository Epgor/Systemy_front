
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError, of, tap } from 'rxjs';
import { Article } from '../models/article';
import { ArticleBlock } from '../models/article-block';
const httpOptions ={
  'Content-Type': 'application/json',
  observe: 'body' as const,
  responseType: 'json' as const,
}
@Injectable({
  providedIn: 'root'
})

export class ArticleService {

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

  getArticles(courseId: number): Observable<Article[]> {

    let url = `https://localhost:7038/api/article/${courseId}`;

    const articles = this.http.get<Article[]>(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    )

    return articles;
  }

  getBlocks(articleId: number): Observable<ArticleBlock[]> {
    
    let url = `https://localhost:7038/api/article/blocks/${articleId}`;

    const blocks = this.http.get<ArticleBlock[]>(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    )

    return blocks;
  }

  getArticle(articleId: number): Observable<Article> {
    let url = `https://localhost:7038/api/article/get/${articleId}`

    const article = this.http.get<Article>(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );

    return article;
  }
  
  editArticle(articleId: number, atext: string, typ: number): Observable<any> {
    let url = `https://localhost:7038/api/article/${articleId}`;

    return this.http.put(url, {'text': atext, 'learningType': typ}, httpOptions).pipe(
      catchError(this.handleError)
    );


  }

  deleteArticle(id: number): Observable<any> {
    let url =`https://localhost:7038/api/article/${id}`;

    return this.http.delete(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  addArticle(courseId: number, article: Article): Observable<any> {
    let url = `https://localhost:7038/api/article/${courseId}`;

    return this.http.post(url, {"text": article.text, "learningType": article.learningType}, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  addBlock(articleId: number, title: string, content: string, type: number): Observable<any>
  {
    let url = `https://localhost:7038/api/article/blocks/${articleId}`;

    return this.http.post(url, {"title": title, "content": content, "type": type}, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteBlock(id: number)
  {
    let url = `https://localhost:7038/api/article/blocks/${id}`;

    return this.http.delete(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  addPhoto(photo: File)
  {
    let url = `https://localhost:7038/image`;

    return this.http.post(url, photo, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

}
