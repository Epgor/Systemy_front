import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  isDark: boolean = false;
  constructor() { }

  getTheme(): boolean{
    return this.isDark;
  }

  setTheme(){
    this.isDark = !this.isDark;
  }
}
