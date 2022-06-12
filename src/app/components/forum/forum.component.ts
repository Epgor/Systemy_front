import { Component, OnInit } from '@angular/core';
import { Forum } from 'src/app/models/forum';
import { ForumServiceService } from 'src/app/services/forum-service.service';
import { LoginService } from 'src/app/services/login.service';

export interface PeriodicElement {
  tytul: string;
  Id: number;
  autor: string;
  data: string;
  tekst: string;
}
 
const ELEMENT_DATA: PeriodicElement[] = [
  {Id: 1, tytul: 'Hydrogen', autor: 'Autor1', data: '19.01.2022', tekst: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'},
  {Id: 2, tytul: 'Helium', autor: 'Autor2', data: '01.03.2022', tekst: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'},
  {Id: 3, tytul: 'Lithium', autor: 'Autor3', data: '15.03.2022', tekst: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'},
  {Id: 4, tytul: 'Beryllium', autor: 'Autor4', data: '19.03.2022', tekst: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'},
  {Id: 5, tytul: 'Boron', autor: 'Autor5', data: '06.04.2022', tekst: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'},
  {Id: 6, tytul: 'Carbon', autor: 'Autor6', data: '24.04.2022', tekst: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'},
  {Id: 7, tytul: 'Nitrogen', autor: 'Autor7', data: '10.05.2022', tekst: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'},
  {Id: 8, tytul: 'Oxygen', autor: 'Autor8', data: '21.05.2022', tekst: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'},
  {Id: 9, tytul: 'Fluorine', autor: 'Autor9', data: '01.06.2022', tekst: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'},
  {Id: 10, tytul: 'Neon', autor: 'Auto10', data: '10.06.2022', tekst: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'},
];
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
 
  displayedColumns: string[] = ['Id', 'tytul', 'autor', 'data', 'tekst'];
  isChecked: boolean = false;
  forum: Forum[] = [];
  dataSource = this.forum;
  constructor(private forumService: ForumServiceService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.forumService.getForum().subscribe(
      r => {
        this.forum = r;
        this.forum.pop();
        this.dataSource = this.forum;
      }
    )
  }

  addForum(tytul: string){
    let role = this.loginService.getRole();
    let name = this.loginService.getName();
    let autor = '';
    
    if(role =="Admin")
      autor = `${role}: ${name}`;
    else
      autor = `${name}`;
    this.forumService.createForum(autor, tytul).subscribe(  r => window.location.reload());
  }

  deleteForum(id: number)
  {
    this.forumService.deleteForum(id).subscribe(  r => window.location.reload());
  }
  imAdmin(): boolean
  {
    if(this.loginService.getRole() == 'Admin')
      return true
    return false
  }
}
