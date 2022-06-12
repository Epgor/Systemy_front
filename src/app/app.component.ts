import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { Subscription } from 'rxjs';
import { RequestService } from './services/request.service';
import { DarkModeService } from './services/dark-mode.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Platforma e-learningowa';
  isLoggedIn: boolean = false;
  isDark: boolean = false;
  subscription: Subscription;

  constructor(private loginService: LoginService, private requestService: RequestService, private themeService: DarkModeService) {
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
  dark(): boolean{
    return this.themeService.getTheme();
  }

}
