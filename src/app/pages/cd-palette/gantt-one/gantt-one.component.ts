// Based on https://codepen.io/carlo-peluso/pen/XWWJwYE
import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { HtmlElemService } from '../../../@cd/guig/html-elem.service';

interface Task {
  id: number;
  taskLable: String;
  startLable: String;
  endLabel: String;
  barLeft: number;
  barWidth: number;
  state: number;
}
@Component({
  selector: 'ngx-gantt-one',
  templateUrl: './gantt-one.component.html',
  styleUrls: ['./gantt-one.component.scss']
})
export class GanttOneComponent implements OnInit, AfterViewInit {

  tasksData: Task[] = [
    {
      id: 1,
      taskLable: "label 1",
      startLable: "dd/mm/yyyy",
      endLabel: "dd/mm/yyyy",
      barLeft: 60,
      barWidth: 200,
      state: 1
    },
    {
      id: 2,
      taskLable: "label 2",
      startLable: "dd/mm/yyyy",
      endLabel: "dd/mm/yyyy",
      barLeft: 100,
      barWidth: 400,
      state: 2
    },
    {
      id: 3,
      taskLable: "label 3",
      startLable: "dd/mm/yyyy",
      endLabel: "dd/mm/yyyy",
      barLeft: 80,
      barWidth: 500,
      state: 2
    }];
  constructor(
    public svHtml: HtmlElemService,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.setTaskStyle();
  }

  setTaskStyle() {
    this.tasksData.forEach((t) => {
      const elem = document.getElementById(`${t.id}`) as HTMLElement;
      elem.classList.add('gantt-range');
      if(t.state == 1){
        elem.classList.add('active');
      }
      elem.setAttribute("style", `margin-left:${t.barLeft}px; width: ${t.barWidth}px;`);
    });
  }

  setTaskClass(task) {
    switch (task.state) {
      case 1:
        return 'gantt-range active';
        break;
      case 2:
        return 'gantt-range';
        break;
      default:
        return 'gantt-range';
    }
  }

}
