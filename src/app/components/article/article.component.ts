import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleBlock } from 'src/app/models/article-block';
import { ArticleService } from 'src/app/services/article.service';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  urlSafe: SafeResourceUrl = "";
  id: number = 0;
  listBlock: ArticleBlock[] = [];
  constructor( private route: ActivatedRoute,
               private articleService: ArticleService,
               private location: Location,
               public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.id = Number(this.route
      .snapshot.paramMap.get('id'));

      this.articleService.getBlocks(this.id)
      .subscribe(
        response => {
          this.listBlock = response;
          console.warn(this.listBlock);
        }
        
      )
  }
  goBack():void{
    this.location.back();
    this.location.back();
  }
  makeSafe(unsafeUrl: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }
}
