import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ForumServiceService } from 'src/app/services/forum-service.service';
import { Forum } from 'src/app/models/forum';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-posty',
  templateUrl: './posty.component.html',
  styleUrls: ['./posty.component.css']
})
export class PostyComponent implements OnInit {
  isChecked: boolean = false;
  post: Post[] = [];
  forum: Forum = {
    id: 0,
    title: '',
    text: '',
    author: '',
    data: ''
  };
  id: number = 0;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private forumService: ForumServiceService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.getPosts();
    this.getForum();
  }

  getPosts(): void {
    this.id = Number(this.route
      .snapshot.paramMap.get('id'));

    this.forumService.getPosts(this.id).subscribe(r => {
      this.post = r;
    });
  }

  goBack(): void {
    this.location.back();
  }

  addPost(text: string)
  {
    let role = this.loginService.getRole();
    let name = this.loginService.getName();
    let autor = '';
    
    if(role =="Admin")
      autor = `${role}: ${name}`;
    else
      autor = `${name}`;

    this.forumService.sendPost(this.id, text, autor).subscribe(  r => window.location.reload());
  }

  getForum()
  {
    this.forumService.getSingleForum(this.id).subscribe(r => this.forum = r);
  }

  deletePost(id: number)
  {
    this.forumService.deletePost(id).subscribe(  r => window.location.reload());
  }

  imAdmin(): boolean
  {
    if(this.loginService.getRole() == 'Admin')
      return true
    return false
  }

}
