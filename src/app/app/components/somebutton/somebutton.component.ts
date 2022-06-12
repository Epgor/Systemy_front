import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-somebutton',
  templateUrl: './somebutton.component.html',
  styleUrls: ['./somebutton.component.css']
})
export class SomebuttonComponent implements OnInit {

  @Input() text!: string;
  @Input() color!: string;
  @Output() btnClick = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onClick() {
    this.btnClick.emit();
    //console.log(this.btnClick);
    /*
    if(this.color =='red')
    {
      this.color='green';
    }
    else{
      this.color ='red'
    }
    */
  }
}
