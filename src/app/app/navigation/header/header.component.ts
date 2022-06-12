import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Platforma e-learningowa';
  isLoggedIn: boolean = false;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private loginService: LoginService, private requestService: RequestService) { }

  logOut(){

    window.alert('bye!');
  }
  whoAmI(){
    window.alert('Oliwka :D');
  }

  myType(){

    window.alert('Oliwka :D');
  }

  ngOnInit(): void {
  }

  public onToggleSidenav = () => { 
    this.sidenavToggle.emit();
  }
}

