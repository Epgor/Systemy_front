import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  isLoggedIn: boolean = false;
  subscription: Subscription;
  headers: string[] = [];
  constructor(private loginService: LoginService) { 
    this.subscription = this.loginService
    .onToggle()
    .subscribe((value) => (this.isLoggedIn = value))
  }

  ngOnInit(): void {
  }

  clickRegister(name: string, email: string, pass: string, confpass: string)
  {
    name = name.trim();
    email = email.trim();
    pass = pass.trim();
    confpass = confpass.trim();

    this.loginService
    .register(name, email, pass, confpass)
    .subscribe();
  }

  clickLogin(login: string, pass: string) {
    login = login.trim();
    pass = pass.trim();
    //console.log(123);
    //this.loginService.toggleLogin();
    let mock_login = 'email@page.ok';
    let mock_pass = 'Strong1@3';
    var output = this.loginService
    .tryLogin(login, pass)
    .subscribe( resp => {
      resp.body !== null ? this.loginService.setToken(resp.body) : [];
      this.loginService.logIn();
    });

      //this.config = {...resp.body!};

    //console.warn(this.headers);
    //console.log(output);

  }
  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  


}
