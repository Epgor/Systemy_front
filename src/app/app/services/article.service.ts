
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
  //sztuczne bloki
  bloki: ArticleBlock[] =[
    {
      "id": 1,
      "title": "Pierwszy blok",
      "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed augue in lorem convallis suscipit vitae in odio. Praesent facilisis venenatis nunc, et tincidunt tellus. Nullam a est eu erat euismod egestas. Aliquam molestie convallis mattis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus efficitur lectus sit amet neque commodo tristique. Sed massa libero, lobortis non dolor sed, egestas semper neque. Integer id massa vehicula est vestibulum laoreet.",
      "type": 1,

    },
    {
      "id": 2,
      "title": "Drugi blok",
      "content": "In lectus neque, viverra ut tempor quis, tincidunt id velit. Fusce mauris lorem, finibus a pulvinar sit amet, suscipit sed mauris. Morbi faucibus diam diam, porta tempus diam auctor ac. Praesent ut tincidunt massa. Aenean at mi ante. Nunc a odio malesuada, scelerisque velit eget, gravida elit. Maecenas quam risus, consequat ac quam porta, fermentum faucibus eros. Maecenas ornare dolor erat, nec dapibus eros interdum sed.",
      "type": 1,

    },
    {
      "id": 3,
      "title": "Trzeci blok",
      "content": "Fusce bibendum suscipit odio. Integer ornare, nisi et viverra gravida, odio lacus posuere nisi, et sodales mauris nisi quis lacus. Nulla vulputate massa blandit tellus bibendum consequat. Morbi lorem enim, iaculis et scelerisque et, luctus congue turpis. Duis nec lorem nec tellus vestibulum porttitor ac sed lacus. Integer ligula orci, posuere sit amet mauris a, ullamcorper ullamcorper lectus. Maecenas non quam felis.",
      "type": 1,

    },
    {
      "id": 4,
      "title": "Czwarty Blok Foto",
      "content": "https://localhost:7038/image/image1.jpg",
      "type": 2,

    },
    {
      "id": 5,
      "title": "Pierwszy blok",
      "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed augue in lorem convallis suscipit vitae in odio. Praesent facilisis venenatis nunc, et tincidunt tellus. Nullam a est eu erat euismod egestas. Aliquam molestie convallis mattis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus efficitur lectus sit amet neque commodo tristique. Sed massa libero, lobortis non dolor sed, egestas semper neque. Integer id massa vehicula est vestibulum laoreet.",
      "type": 1,

    },
    {
      "id": 6,
      "title": "Drugi blok",
      "content": "In lectus neque, viverra ut tempor quis, tincidunt id velit. Fusce mauris lorem, finibus a pulvinar sit amet, suscipit sed mauris. Morbi faucibus diam diam, porta tempus diam auctor ac. Praesent ut tincidunt massa. Aenean at mi ante. Nunc a odio malesuada, scelerisque velit eget, gravida elit. Maecenas quam risus, consequat ac quam porta, fermentum faucibus eros. Maecenas ornare dolor erat, nec dapibus eros interdum sed.",
      "type": 1,

    },
    {
      "id": 7,
      "title": "Trzeci blok",
      "content": "Fusce bibendum suscipit odio. Integer ornare, nisi et viverra gravida, odio lacus posuere nisi, et sodales mauris nisi quis lacus. Nulla vulputate massa blandit tellus bibendum consequat. Morbi lorem enim, iaculis et scelerisque et, luctus congue turpis. Duis nec lorem nec tellus vestibulum porttitor ac sed lacus. Integer ligula orci, posuere sit amet mauris a, ullamcorper ullamcorper lectus. Maecenas non quam felis.",
      "type": 1,

    },
    {
      "id": 8,
      "title": "Foto blok",
      "content": "https://localhost:7038/image/image2.jpg",
      "type": 2,

    },
    {
      "id": 9,
      "title": "Trzeci piąty",
      "content": "Fusce bibendum suscipit odio. Integer ornare, nisi et viverra gravida, odio lacus posuere nisi, et sodales mauris nisi quis lacus. Nulla vulputate massa blandit tellus bibendum consequat. Morbi lorem enim, iaculis et scelerisque et, luctus congue turpis. Duis nec lorem nec tellus vestibulum porttitor ac sed lacus. Integer ligula orci, posuere sit amet mauris a, ullamcorper ullamcorper lectus. Maecenas non quam felis.",
      "type": 1,

    },
    {
      "id": 10,
      "title": "Foto blok",
      "content": "https://localhost:7038/image/image3.jpg",
      "type": 2,

    },
    {
      "id": 11,
      "title": "Trzeci piąty",
      "content": "Fusce bibendum suscipit odio. Integer ornare, nisi et viverra gravida, odio lacus posuere nisi, et sodales mauris nisi quis lacus. Nulla vulputate massa blandit tellus bibendum consequat. Maecenas non quam felis.",
      "type": 1,

    }
  ]
  //sztuczne artykuły
  artykul: Article[] = [
    {
      "id": 1,
      "text": "Wprowadzenie do elementów",
      "learningType": 0
    },
    {
      "id": 4,
      "text": "Lorem Ipsum, dolor est",
      "learningType": 0
    },
    {
      "id": 5,
      "text": "Lorem Ipsum, dolor est",
      "learningType": 0
    },
    {
      "id": 6,
      "text": "Lorem Ipsum, dolor est",
      "learningType": 0
    },
    {
      "id": 7,
      "text": "Lorem Ipsum, dolor est",
      "learningType": 0
    },
  ];

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

  getArticles(courseId: number): Article[] {



    return this.artykul;
  }

  getBlocks(articleId: number): ArticleBlock[] {
    

    return this.bloki;
  }
  

}
