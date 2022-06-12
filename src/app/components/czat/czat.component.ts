import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { ForumServiceService } from 'src/app/services/forum-service.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-czat',
  templateUrl: './czat.component.html',
  styleUrls: ['./czat.component.css']
})
export class CzatComponent implements OnInit {


  isChecked: boolean = false;
  text:string = 'Treść wiadomości';
  imageSrc = 'assets/mango.png';

  chat: Post[] = [];

  constructor(private forumService: ForumServiceService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.forumService.getChat().subscribe(r => 
      {
        this.chat = r;
      console.warn(this.chat);
    }
        
        );
  }
  send(mess: string): void{
    let role = this.loginService.getRole();
    let name = this.loginService.getName();
    let autor = '';
    
    if(role =="Admin")
      autor = `${role}: ${name}`;
    else
      autor = `${name}`;
      
    this.forumService.sendPost(1, mess, autor).subscribe(
      r => window.location.reload()
    );


  }

  delete(id: number):void{
    this.forumService.deletePost(id).subscribe(
            r => window.location.reload()
    )
  }
  imAdmin(): boolean
  {
    if(this.loginService.getRole() == 'Admin')
      return true
    return false
  }

}
