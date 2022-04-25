import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ConstantPool } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { User } from '../user';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private isLoggedIn: boolean = true;
  private subject = new Subject<any>();
  private token: string ="";

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      window.alert(
        error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  constructor(private http: HttpClient) { 
    

  }
  
  register(name: string, email: string, pass: string, confpass: string){
    const httpOptions ={
      'Content-Type': 'application/json',
      observe: 'response' as const,
      responseType: 'text' as const,
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
    
    var returned = this.parseJwt(this.token);

    window.alert('Your Learnig Type is : '+Object.values(returned)[3]);
  }
}
