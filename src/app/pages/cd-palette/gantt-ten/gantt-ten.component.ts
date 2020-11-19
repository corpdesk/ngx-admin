// Based on: https://oguzhanoya.github.io/jquery-gantt/
import { Component, OnInit, AfterViewInit, ViewChild, Input, ElementRef,ViewEncapsulation } from '@angular/core';
import { ScheduleService } from '../../../@cd/sys/scheduler/controllers/schedule.service'
import * as moment from 'moment';

interface dDay {
  d: number;
  dow: string;
}


@Component({
  selector: 'ngx-gantt-ten',
  templateUrl: './gantt-ten.component.html',
  styleUrls: ['./gantt-ten.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GanttTenComponent implements OnInit, AfterViewInit {
  constructor(
    private elementRef: ElementRef,
    public svSchedule: ScheduleService
  ) {
    
  }

  ngOnInit(): void {
    this.render();
  }

  ngAfterViewInit() {
    
  }

  render(){
    const cdGantt = this.elementRef.nativeElement.querySelector('#cdGantt') as HTMLElement;
    const htmlCdGantt = `<div class="gantt-wrapper">
    <div class="arrow arrow-left"><span class="arrow-icon"></span></div>
    <div class="gantt-container">
      <div class="gantt-header">
        <div class="gantt-header-months" style="width: 1860px;">
          <div class="gantt-header-month" style="width: 620px;">July 2016</div>
          <div class="gantt-header-month" style="width: 620px;">August 2016</div>
          <div class="gantt-header-month" style="width: 600px;">September 2016</div>
          <div class="gantt-header-month" style="width: 20px;">October 2016</div>
        </div>
        <div class="gantt-header-days" style="width: 1860px;">
          <div class="gantt-header-day" style="width: 20px;">1</div>
          <div class="gantt-header-day" style="width: 20px;">2</div>
          <div class="gantt-header-day" style="width: 20px;">3</div>
          <div class="gantt-header-day" style="width: 20px;">4</div>
          <div class="gantt-header-day" style="width: 20px;">5</div>
          <div class="gantt-header-day" style="width: 20px;">6</div>
          <div class="gantt-header-day" style="width: 20px;">7</div>
          <div class="gantt-header-day" style="width: 20px;">8</div>
          <div class="gantt-header-day" style="width: 20px;">9</div>
          <div class="gantt-header-day" style="width: 20px;">10</div>
          <div class="gantt-header-day" style="width: 20px;">11</div>
          <div class="gantt-header-day" style="width: 20px;">12</div>
          <div class="gantt-header-day" style="width: 20px;">13</div>
          <div class="gantt-header-day" style="width: 20px;">14</div>
          <div class="gantt-header-day" style="width: 20px;">15</div>
          <div class="gantt-header-day" style="width: 20px;">16</div>
          <div class="gantt-header-day" style="width: 20px;">17</div>
          <div class="gantt-header-day" style="width: 20px;">18</div>
          <div class="gantt-header-day" style="width: 20px;">19</div>
          <div class="gantt-header-day" style="width: 20px;">20</div>
          <div class="gantt-header-day" style="width: 20px;">21</div>
          <div class="gantt-header-day" style="width: 20px;">22</div>
          <div class="gantt-header-day" style="width: 20px;">23</div>
          <div class="gantt-header-day" style="width: 20px;">24</div>
          <div class="gantt-header-day" style="width: 20px;">25</div>
          <div class="gantt-header-day" style="width: 20px;">26</div>
          <div class="gantt-header-day" style="width: 20px;">27</div>
          <div class="gantt-header-day" style="width: 20px;">28</div>
          <div class="gantt-header-day" style="width: 20px;">29</div>
          <div class="gantt-header-day" style="width: 20px;">30</div>
          <div class="gantt-header-day" style="width: 20px;">31</div>
          <div class="gantt-header-day" style="width: 20px;">1</div>
          <div class="gantt-header-day" style="width: 20px;">2</div>
          <div class="gantt-header-day" style="width: 20px;">3</div>
          <div class="gantt-header-day active" style="width: 20px;">4</div>
          <div class="gantt-header-day" style="width: 20px;">5</div>
          <div class="gantt-header-day" style="width: 20px;">6</div>
          <div class="gantt-header-day" style="width: 20px;">7</div>
          <div class="gantt-header-day" style="width: 20px;">8</div>
          <div class="gantt-header-day" style="width: 20px;">9</div>
          <div class="gantt-header-day" style="width: 20px;">10</div>
          <div class="gantt-header-day" style="width: 20px;">11</div>
          <div class="gantt-header-day" style="width: 20px;">12</div>
          <div class="gantt-header-day" style="width: 20px;">13</div>
          <div class="gantt-header-day" style="width: 20px;">14</div>
          <div class="gantt-header-day" style="width: 20px;">15</div>
          <div class="gantt-header-day" style="width: 20px;">16</div>
          <div class="gantt-header-day" style="width: 20px;">17</div>
          <div class="gantt-header-day" style="width: 20px;">18</div>
          <div class="gantt-header-day" style="width: 20px;">19</div>
          <div class="gantt-header-day" style="width: 20px;">20</div>
          <div class="gantt-header-day" style="width: 20px;">21</div>
          <div class="gantt-header-day" style="width: 20px;">22</div>
          <div class="gantt-header-day" style="width: 20px;">23</div>
          <div class="gantt-header-day" style="width: 20px;">24</div>
          <div class="gantt-header-day" style="width: 20px;">25</div>
          <div class="gantt-header-day" style="width: 20px;">26</div>
          <div class="gantt-header-day" style="width: 20px;">27</div>
          <div class="gantt-header-day" style="width: 20px;">28</div>
          <div class="gantt-header-day" style="width: 20px;">29</div>
          <div class="gantt-header-day" style="width: 20px;">30</div>
          <div class="gantt-header-day" style="width: 20px;">31</div>
          <div class="gantt-header-day" style="width: 20px;">1</div>
          <div class="gantt-header-day" style="width: 20px;">2</div>
          <div class="gantt-header-day" style="width: 20px;">3</div>
          <div class="gantt-header-day" style="width: 20px;">4</div>
          <div class="gantt-header-day" style="width: 20px;">5</div>
          <div class="gantt-header-day" style="width: 20px;">6</div>
          <div class="gantt-header-day" style="width: 20px;">7</div>
          <div class="gantt-header-day" style="width: 20px;">8</div>
          <div class="gantt-header-day" style="width: 20px;">9</div>
          <div class="gantt-header-day" style="width: 20px;">10</div>
          <div class="gantt-header-day" style="width: 20px;">11</div>
          <div class="gantt-header-day" style="width: 20px;">12</div>
          <div class="gantt-header-day" style="width: 20px;">13</div>
          <div class="gantt-header-day" style="width: 20px;">14</div>
          <div class="gantt-header-day" style="width: 20px;">15</div>
          <div class="gantt-header-day" style="width: 20px;">16</div>
          <div class="gantt-header-day" style="width: 20px;">17</div>
          <div class="gantt-header-day" style="width: 20px;">18</div>
          <div class="gantt-header-day" style="width: 20px;">19</div>
          <div class="gantt-header-day" style="width: 20px;">20</div>
          <div class="gantt-header-day" style="width: 20px;">21</div>
          <div class="gantt-header-day" style="width: 20px;">22</div>
          <div class="gantt-header-day" style="width: 20px;">23</div>
          <div class="gantt-header-day" style="width: 20px;">24</div>
          <div class="gantt-header-day" style="width: 20px;">25</div>
          <div class="gantt-header-day" style="width: 20px;">26</div>
          <div class="gantt-header-day" style="width: 20px;">27</div>
          <div class="gantt-header-day" style="width: 20px;">28</div>
          <div class="gantt-header-day" style="width: 20px;">29</div>
          <div class="gantt-header-day" style="width: 20px;">30</div>
          <div class="gantt-header-day" style="width: 20px;">1</div>
        </div>
        <div class="gantt-header-days-min" style="width: 1860px;">
          <div class="gantt-header-day-min" style="width: 20px;">Fr</div>
          <div class="gantt-header-day-min" style="width: 20px;">Sa</div>
          <div class="gantt-header-day-min" style="width: 20px;">Su</div>
          <div class="gantt-header-day-min" style="width: 20px;">Mo</div>
          <div class="gantt-header-day-min" style="width: 20px;">Tu</div>
          <div class="gantt-header-day-min" style="width: 20px;">We</div>
          <div class="gantt-header-day-min" style="width: 20px;">Th</div>
          <div class="gantt-header-day-min" style="width: 20px;">Fr</div>
          <div class="gantt-header-day-min" style="width: 20px;">Sa</div>
          <div class="gantt-header-day-min" style="width: 20px;">Su</div>
          <div class="gantt-header-day-min" style="width: 20px;">Mo</div>
          <div class="gantt-header-day-min" style="width: 20px;">Tu</div>
          <div class="gantt-header-day-min" style="width: 20px;">We</div>
          <div class="gantt-header-day-min" style="width: 20px;">Th</div>
          <div class="gantt-header-day-min" style="width: 20px;">Fr</div>
          <div class="gantt-header-day-min" style="width: 20px;">Sa</div>
          <div class="gantt-header-day-min" style="width: 20px;">Su</div>
          <div class="gantt-header-day-min" style="width: 20px;">Mo</div>
          <div class="gantt-header-day-min" style="width: 20px;">Tu</div>
          <div class="gantt-header-day-min" style="width: 20px;">We</div>
          <div class="gantt-header-day-min" style="width: 20px;">Th</div>
          <div class="gantt-header-day-min" style="width: 20px;">Fr</div>
          <div class="gantt-header-day-min" style="width: 20px;">Sa</div>
          <div class="gantt-header-day-min" style="width: 20px;">Su</div>
          <div class="gantt-header-day-min" style="width: 20px;">Mo</div>
          <div class="gantt-header-day-min" style="width: 20px;">Tu</div>
          <div class="gantt-header-day-min" style="width: 20px;">We</div>
          <div class="gantt-header-day-min" style="width: 20px;">Th</div>
          <div class="gantt-header-day-min" style="width: 20px;">Fr</div>
          <div class="gantt-header-day-min" style="width: 20px;">Sa</div>
          <div class="gantt-header-day-min" style="width: 20px;">Su</div>
          <div class="gantt-header-day-min" style="width: 20px;">Mo</div>
          <div class="gantt-header-day-min" style="width: 20px;">Tu</div>
          <div class="gantt-header-day-min" style="width: 20px;">We</div>
          <div class="gantt-header-day-min active" style="width: 20px;">Th</div>
          <div class="gantt-header-day-min" style="width: 20px;">Fr</div>
          <div class="gantt-header-day-min" style="width: 20px;">Sa</div>
          <div class="gantt-header-day-min" style="width: 20px;">Su</div>
          <div class="gantt-header-day-min" style="width: 20px;">Mo</div>
          <div class="gantt-header-day-min" style="width: 20px;">Tu</div>
          <div class="gantt-header-day-min" style="width: 20px;">We</div>
          <div class="gantt-header-day-min" style="width: 20px;">Th</div>
          <div class="gantt-header-day-min" style="width: 20px;">Fr</div>
          <div class="gantt-header-day-min" style="width: 20px;">Sa</div>
          <div class="gantt-header-day-min" style="width: 20px;">Su</div>
          <div class="gantt-header-day-min" style="width: 20px;">Mo</div>
          <div class="gantt-header-day-min" style="width: 20px;">Tu</div>
          <div class="gantt-header-day-min" style="width: 20px;">We</div>
          <div class="gantt-header-day-min" style="width: 20px;">Th</div>
          <div class="gantt-header-day-min" style="width: 20px;">Fr</div>
          <div class="gantt-header-day-min" style="width: 20px;">Sa</div>
          <div class="gantt-header-day-min" style="width: 20px;">Su</div>
          <div class="gantt-header-day-min" style="width: 20px;">Mo</div>
          <div class="gantt-header-day-min" style="width: 20px;">Tu</div>
          <div class="gantt-header-day-min" style="width: 20px;">We</div>
          <div class="gantt-header-day-min" style="width: 20px;">Th</div>
          <div class="gantt-header-day-min" style="width: 20px;">Fr</div>
          <div class="gantt-header-day-min" style="width: 20px;">Sa</div>
          <div class="gantt-header-day-min" style="width: 20px;">Su</div>
          <div class="gantt-header-day-min" style="width: 20px;">Mo</div>
          <div class="gantt-header-day-min" style="width: 20px;">Tu</div>
          <div class="gantt-header-day-min" style="width: 20px;">We</div>
          <div class="gantt-header-day-min" style="width: 20px;">Th</div>
          <div class="gantt-header-day-min" style="width: 20px;">Fr</div>
          <div class="gantt-header-day-min" style="width: 20px;">Sa</div>
          <div class="gantt-header-day-min" style="width: 20px;">Su</div>
          <div class="gantt-header-day-min" style="width: 20px;">Mo</div>
          <div class="gantt-header-day-min" style="width: 20px;">Tu</div>
          <div class="gantt-header-day-min" style="width: 20px;">We</div>
          <div class="gantt-header-day-min" style="width: 20px;">Th</div>
          <div class="gantt-header-day-min" style="width: 20px;">Fr</div>
          <div class="gantt-header-day-min" style="width: 20px;">Sa</div>
          <div class="gantt-header-day-min" style="width: 20px;">Su</div>
          <div class="gantt-header-day-min" style="width: 20px;">Mo</div>
          <div class="gantt-header-day-min" style="width: 20px;">Tu</div>
          <div class="gantt-header-day-min" style="width: 20px;">We</div>
          <div class="gantt-header-day-min" style="width: 20px;">Th</div>
          <div class="gantt-header-day-min" style="width: 20px;">Fr</div>
          <div class="gantt-header-day-min" style="width: 20px;">Sa</div>
          <div class="gantt-header-day-min" style="width: 20px;">Su</div>
          <div class="gantt-header-day-min" style="width: 20px;">Mo</div>
          <div class="gantt-header-day-min" style="width: 20px;">Tu</div>
          <div class="gantt-header-day-min" style="width: 20px;">We</div>
          <div class="gantt-header-day-min" style="width: 20px;">Th</div>
          <div class="gantt-header-day-min" style="width: 20px;">Fr</div>
          <div class="gantt-header-day-min" style="width: 20px;">Sa</div>
          <div class="gantt-header-day-min" style="width: 20px;">Su</div>
          <div class="gantt-header-day-min" style="width: 20px;">Mo</div>
          <div class="gantt-header-day-min" style="width: 20px;">Tu</div>
          <div class="gantt-header-day-min" style="width: 20px;">We</div>
          <div class="gantt-header-day-min" style="width: 20px;">Th</div>
          <div class="gantt-header-day-min" style="width: 20px;">Fr</div>
          <div class="gantt-header-day-min" style="width: 20px;">Sa</div>
        </div>
      </div>
      <div class="gantt-grid" style="width: 1860px;">
        <div class="gantt-grid-cols">
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px; border-color: rgb(190, 197, 204);"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col active" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px; border-color: rgb(190, 197, 204);"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px; border-color: rgb(190, 197, 204);"></div>
          <div class="gantt-grid-col" style="width: 20px; height: 76px;"></div>
        </div>
        <div class="gantt-grid-rows">
          <div class="gantt-grid-row" style="width: 1860px; height: 38px;"></div>
          <div class="gantt-grid-row" style="width: 1860px; height: 38px;"></div>
        </div>
      </div>
      <div class="gantt-events" style="width: 1860px;">
        <div class="gantt-event-row" style="height: 38px;">
          <div class="gantt-event" style="left: 400px;"><a class="gantt-event-block tourFly"
              href="http://www.example.com/1" target="_blank" style="width: 100px; line-height: 10px;">4 Gece</a>
            <div class="gantt-event-icon">
              <div class="tourFly"></div>
            </div>
            <div class="gantt-event-price">798 EUR</div>
            <div class="gantt-event-desc">Zaporojie Turu</div>
          </div>
        </div>
        <div class="gantt-event-row" style="height: 38px;">
          <div class="gantt-event" style="left: 400px;"><a class="gantt-event-block tourFly"
              href="http://www.gezinomi.com/amsterdam-ilkbahar-yaz-turu" target="_blank"
              style="width: 80px; line-height: 10px;">3 Gece</a>
            <div class="gantt-event-icon">
              <div class="tourFly"></div>
            </div>
            <div class="gantt-event-price">1098 EUR</div>
            <div class="gantt-event-desc">Amsterdam İlkbahar , Yaz Turu </div>
          </div>
        </div>
      </div>
    </div>
    <div class="arrow arrow-right"><span class="arrow-icon"></span></div>
  </div>`;
    cdGantt.insertAdjacentHTML('beforeend', htmlCdGantt);
  }

}
