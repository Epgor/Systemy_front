import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { Subscription } from 'rxjs';
import { RequestService } from './services/request.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Platforma e-learningowa';
  isLoggedIn: boolean = false;


  constructor(private loginService: LoginService, private requestService: RequestService) {

  }


  logOut(){

    window.alert('bye!');
  }
  whoAmI(){
    window.alert('Oliwka :D');
  }

  myType(){

    window.alert('Oliwka :D');
  }
}
