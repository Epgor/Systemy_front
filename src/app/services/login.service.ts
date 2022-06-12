import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ConstantPool } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, Subject, throwError } from 'rxjs';
import { User } from '../models/user';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private isLoggedIn: boolean = true;
  private subject = new Subject<any>();
  private token: string ="";
  constructor(private http: HttpClient) { 
    

  }
  
  private handleError(error: HttpErrorResponse) {
    try
    {
      if (error.status !== 0) {
      
        let responseErrors = Object.entries(error.error.errors)
        .map((x: any) => {return(`${x[1][0]}\n`)});
  
        let logResp = `${error.name} : ${error.status}\n ${responseErrors}`;
        window.alert(logResp);
      }
      
    }
    catch
    {
      if (error.status !== 0) {
      
        let responseErrors = Object.entries(error.error.errors)
        .map((x: any) => {return(`${x[1][0]}\n`)});
  
        let logResp = `${error.name} : ${error.status}\n ${responseErrors}`;
        window.alert(logResp);
      }
    }

    return throwError(() => new Error(error.message)  )
  }


  register(name: string, email: string, pass: string, confpass: string){
    const httpOptions ={
      'Content-Type': 'application/json',
      observe: 'response' as const,
      responseType: 'json' as const,
    }
    let url = "https://localhost:7038/api/account/register";
    return this.http
    .post(url,{'name': name, 'email': email, 'password': pass, 'confirmPassword': confpass}, httpOptions)
    .pipe(
      catchError(this.handleError)
    );

  }

  toggleLogin(): void {
    this.isLoggedIn = !this.isLoggedIn;
    this.subject.next(this.isLoggedIn);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

  tryLogin(login: string, password: string) {

    const httpOptions ={
      'Content-Type': 'application/json',
      observe: 'response' as const,
      responseType: 'text' as const,
    }

    let url = "https://localhost:7038/api/account/login";
    return this.http
    .post(url,{'email': login, 'password': password}, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  setToken(token?: string){
    if (token != '' && token != null){
      this.token = token;
      this.storeToken();
    }
  }

  deleteToken(){
    this.token = '';
    localStorage.removeItem('token');
  }

  getToken(){
    return this.token;
  }

  logIn() {
    if (this.token != '' && this.token != null)
    {
      this.isLoggedIn = true;
      console.warn(this.isLoggedIn);
      console.warn(this.token);
      this.subject.next(this.isLoggedIn);
    }
  }

  logOut(){
    this.deleteToken()
    this.isLoggedIn = false;
  }

  storeToken(){
    localStorage.setItem('token', this.token);
  }

  getTokenStorage(){
    let tempToken = localStorage.getItem('token');
    tempToken !== null ? this.token = tempToken : [];
  }

  parseJwt (token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  helloUser(){
    this.getTokenStorage();
    
    var returned = this.parseJwt(this.token);
    console.warn(Object.keys(returned));
    console.warn(Object.values(returned));
    window.alert('Hello '+Object.values(returned)[1]
    +'\nYour role is: '+Object.values(returned)[2]);
    
  }

  getMyType()
  {
    this.getTokenStorage();
    /*
    const request$ = this.http.post();
    firstValueFrom(request$).then
    */
    var returned = this.parseJwt(this.token);

    window.alert('Your Learnig Type is : '+Object.values(returned)[3]);
  }

  testGet(){
    this.getTokenStorage();
    let var0 = Object.values(this.parseJwt(this.token))[0]; //id
    let var1 = Object.values(this.parseJwt(this.token))[1]; //name
    let var2 = Object.values(this.parseJwt(this.token))[2]; //role
    let var3 = Object.values(this.parseJwt(this.token))[3]; //learningType
    let var4 = Object.values(this.parseJwt(this.token))[4]; //birthdate
    let var5 = Object.values(this.parseJwt(this.token))[5]; //expiration
    
    window.alert(`${var0}, ${var1}, ${var2}, ${var3}, ${var4}, ${var5},`);
  }

  getId()
  {
    this.getTokenStorage();
    if (this.token == '' || this.token == null)
    {
      return 0;
    }
    
    let var0 = Object.values(this.parseJwt(this.token))[0];
    return var0;
  }

  getName()
  {
    this.getTokenStorage();
    if (this.token == '' || this.token == null)
    {
      return "0";
    }
    
    let var1 = Object.values(this.parseJwt(this.token))[1];
    return var1;
  }

  getRole()
  {
    this.getTokenStorage();
    if (this.token == '' || this.token == null)
    {
      return "0";
    }
    
    let var2 = Object.values(this.parseJwt(this.token))[2];
    return var2;
  }

  getType()
  {
    this.getTokenStorage();
    if (this.token == '' || this.token == null)
    {
      return 0;
    }
    
    let var3 = Object.values(this.parseJwt(this.token))[3];
    return var3;
  }

}
