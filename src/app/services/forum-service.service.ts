import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError, of, tap } from 'rxjs';
import { Forum } from '../models/forum'; 
import { Post } from '../models/post';

const httpOptions ={
  'Content-Type': 'application/json',
  observe: 'body' as const,
  responseType: 'json' as const,
}

@Injectable({
  providedIn: 'root'
})
export class ForumServiceService {
  private handleError(error: HttpErrorResponse) {
    try
    {
      if (error.status !== 0) {
      
        let responseErrors = Object.entries(error.error.errors)
        .map((x: any) => {return(`${x[1][0]}\n`)});
  
        let logResp = `${error.name} : ${error.status}\n ${responseErrors}`;
        window.alert(logResp);
      }
      
    }
    catch
    {
      if (error.status !== 0) {
      
        let responseErrors = Object.entries(error.error.errors)
        .map((x: any) => {return(`${x[1][0]}\n`)});
  
        let logResp = `${error.name} : ${error.status}\n ${responseErrors}`;
        window.alert(logResp);
      }
    }

    return throwError(() => new Error(error.message)  )
  }

  constructor(private http: HttpClient) { }

  getForum(): Observable<Forum[]>
  {
    let url = `https://localhost:7038/api/forum`;

    return this.http.get<Forum[]>(url, httpOptions).pipe(
      catchError(this.handleError)
    )


  }

  getSingleForum(id: number): Observable<Forum>
  {
    let url = `https://localhost:7038/api/forum/${id}`;

    return this.http.get<Forum>(url, httpOptions).pipe(
      catchError(this.handleError)
    )

  }

  getChat(): Observable<Post[]>
  {
    let url = `https://localhost:7038/api/forum/1/post`;

    return this.http.get<Post[]>(url, httpOptions).pipe(
      catchError(this.handleError)
    )

  }

  sendPost(id: number, mess: string, autor: string): Observable<any>
  {
    let url = `https://localhost:7038/api/forum/${id}/post`;

    return this.http.post(url, {"author": autor, "text": mess},httpOptions).pipe(
      catchError(this.handleError)
    )

  }

  deletePost(id: number): Observable<any>
  {
    let url = `https://localhost:7038/api/forum/post/${id}`;

    return this.http.delete(url, httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  createForum(author: string, title: string): Observable<any>
  {
    let url = 'https://localhost:7038/api/forum';
    let text = '';
    return this.http.post(url, {"author": author, "title": title, "text": text},httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  deleteForum(id: number): Observable<any>
  {
    let url = `https://localhost:7038/api/forum/${id}`;

    return this.http.delete(url,httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  getPosts(id: number): Observable<Post[]>
  {
    let url = `https://localhost:7038/api/forum/${id}/post`;

    return this.http.get<Forum[]>(url, httpOptions).pipe(
      catchError(this.handleError)
    )

  }


}
