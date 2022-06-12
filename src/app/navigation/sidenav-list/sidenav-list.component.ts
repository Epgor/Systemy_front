import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  title = 'Platforma e-learningowa';
  isLoggedIn: boolean = false;

  @Output() sidenavClose = new EventEmitter();

  constructor(private loginService: LoginService, private requestService: RequestService) { }

  logOut(){

    //window.alert('bye!');
  }
  whoAmI(){
    //window.alert('Oliwka :D');
    console.error('1');
  }

  myType(){

    //window.alert('Oliwka :D');
    this.loginService.testGet();

  }

  ngOnInit() {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

}
