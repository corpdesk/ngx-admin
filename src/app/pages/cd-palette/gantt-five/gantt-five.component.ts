import { Component, OnInit } from '@angular/core';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
 
@Component({
  selector: 'ngx-gantt-five',
  templateUrl: './gantt-five.component.html',
  styleUrls: ['./gantt-five.component.scss'],
  animations: [
    // Define animation here
    trigger('myfirstanimation',[
      state('small', style({
        height : '0px',
      })),
      state('large', style({
        height : '100px',
      })),
      transition('small <=> large', animate('300ms ease-in')),
    ]),
  ]
})

export class GanttFiveComponent implements OnInit {
  state: string = 'small';
  constructor() { }

  ngOnInit(): void {

  }

  animateMe(){
    this.state = (this.state === 'small' ? 'large' : 'small');
  }
}
