import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  @Input() article?: Article;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private articleService: ArticleService
  ) { }

  isEye:boolean = false;
  isEar:boolean = false;
  isWork:boolean = false;

  id: number = 0;

  ngOnInit(): void {
    this.getArticle();
  }
  getArticle(): void {
    this.id = Number(this.route
      .snapshot.paramMap.get('id'));

    this.articleService.getArticle(this.id).subscribe(
      resp => {
        this.article = resp;
        this.setFields(this.article.learningType);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  setFields(typInt: number)
  {
    
    let typ = typInt;
    console.warn(typ);
    if(typ >= 4)
    {
      typ -= 4;
      this.isEye = true;
    }
    if(typ >= 2)
    {
      typ -= 2;
      this.isEar = true;
    }
    if(typ >= 1)
    {
      typ -= 1;
      this.isWork = true;
    }
  }

  editArticle(): void{

    let typ = 0;

    if(this.isEye)
      typ += 4
    if(this.isEar)
      typ += 2
    if(this.isWork)
      typ += 1
    
    if(this.article)
    {
      this.articleService.editArticle(this.article.id, this.article.text, typ).subscribe(
        
        r => {
          this.goBack();
          console.warn(typ);
        }
      )
    }

  }

}
