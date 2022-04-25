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

  subscription: Subscription;

  constructor(private loginService: LoginService, private requestService: RequestService) {
    this.subscription = this.loginService
    .onToggle()
    .subscribe((value) => (this.isLoggedIn = value))

    if (localStorage.getItem('token') != null 
    && localStorage.getItem('token') != '')
    {
      //console.warn(localStorage.getItem('token'));
      this.isLoggedIn = true;
    }

    //this.requestService.getData().subscribe(data => console.warn(data))
  }

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}
  logOut(){
    this.loginService.logOut();
    this.isLoggedIn = false;
    window.alert('bye!');
  }
  whoAmI(){
    this.loginService.helloUser();
  }

  myType(){

    this.loginService.getMyType()
    //this.requestService.getUserTy;pe();
  }
}
