// Ref: https://stackblitz.com/edit/my-angular-scroll-better?file=src%2Fapp%2Fapp.component.html
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-gantt-eight',
  templateUrl: './gantt-eight.component.html',
  styleUrls: ['./gantt-eight.component.scss']
})
export class GanttEightComponent implements OnInit {
  name = "Angular";
  items = ["Item 1"];
  color;
  constructor() { }

  ngOnInit(): void {
  }

  add() {
    this.items.push("Item " + (this.items.length + 1));
  }

  remove() {
    this.items.pop();
  }

}
