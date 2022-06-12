import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleBlock } from 'src/app/models/article-block';
import { ArticleService } from 'src/app/services/article.service';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoginService } from 'src/app/services/login.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { HttpClient } from '@angular/common/http';
import { FileUrl } from 'src/app/models/fileUrl';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  
  fileName = '';
  fileLink = '';
  photoName = '';
  photoLink = '';

  urlSafe: SafeResourceUrl = "";
  htmlContent: string = '';
  isChecked: boolean = false;
  id: number = 0;
  blockCreate: ArticleBlock = {
    id: 0,
    title: '',
    content: '',
    type: 0,
  }
  listBlock: ArticleBlock[] = [];
  constructor( private route: ActivatedRoute,
               private articleService: ArticleService,
               private location: Location,
               public sanitizer: DomSanitizer,
               private loginService: LoginService,
               private http: HttpClient,
               private router: Router) { }

  ngOnInit(): void {
    this.id = Number(this.route
      .snapshot.paramMap.get('id'));

      this.articleService.getBlocks(this.id)
      .subscribe(
        response => {
          this.listBlock = response;
        }
        
      )
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '300',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    };

  goBack():void{
    this.location.back();
    this.location.back();
  }
  makeSafe(unsafeUrl: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }

  imAdmin(): boolean
  {
    if(this.loginService.getRole() == 'Admin')
      return true
    return false
  }

  addBlock(type: number){
    //let text = '';
    //text += this.blockCreate.title + '/';
    //text += this.blockCreate.content + '/';
    //text += type + '/';
    //console.warn(text);

    this.articleService.addBlock(this.id, this.blockCreate.title, this.blockCreate.content, type).subscribe(
      r => window.location.reload()
      );
  }

  deleteBlock(id: number)
  {
    this.articleService.deleteBlock(id).subscribe(
      r => window.location.reload()
      );
  }

  addPhoto(file: File)
  {

  }

  onPhotoSelected(event: any) {
    const httpOptions ={
      responseType: 'json' as const,
    }
    let url = "https://localhost:7038/image";

    const file:File = event.target.files[0];

    if (file) {

        this.photoName = file.name;

        let formData = new FormData();

        formData.append("file", file);

        //console.warn(formData);

        this.http.post(url, formData).subscribe(r => 
          {
            this.photoLink = `https://localhost:7038/image/${this.photoName}`;
          }
          );

    }
}

onFileSelected(event: any, download: number) {
  const httpOptions ={
    responseType: 'json' as const,
  }
  let url = "https://localhost:7038/file";

  const file:File = event.target.files[0];

  if (file) {

      this.fileName = file.name;

      let formData = new FormData();

      formData.append("file", file);

      //console.warn(formData);

      this.http.post(url, formData).subscribe(r => 
        {
          if(download == 1)
          {
            this.fileLink = `https://localhost:7038/file/download/${this.fileName}`;
          }
          if(download == 0)
          {
            this.fileLink = `https://localhost:7038/file/${this.fileName}`;
          }
            

            
        }
        );

  }


}
  pobierz(url: string){
    let urlTemp = url.split('/');
    let name = urlTemp.pop();
    let download = `https://localhost:7038/file/download/${name}`;
    window.location.href = download;

}
}
