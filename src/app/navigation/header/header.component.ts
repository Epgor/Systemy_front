import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';
import { DarkModeService } from 'src/app/services/dark-mode.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Platforma e-learningowa';
  isLoggedIn: boolean = false;
  isDark: boolean = false;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private loginService: LoginService, private requestService: RequestService, private themeService: DarkModeService) { }

  logOut(){

    //window.alert('bye!');co tu sie dzieje
    //this.loginService.testGet();
    this.loginService.logOut();
    window.location.reload();
    
  }
  whoAmI(){
    window.alert('Oliwka :D');
  }

  myType(): any{

    //return this.loginService.getMyType();
  }
  changeTheme(){
    this.themeService.setTheme();
  }

  ngOnInit(): void {
  }

  public onToggleSidenav = () => { 
    this.sidenavToggle.emit();
  }
}

