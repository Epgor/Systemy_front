import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor() { }

  showColor: boolean = false;

  toggleColor() {
    this.showColor = !this.showColor;
    //console.log(123);
  }
  ngOnInit(): void {
  }

}
