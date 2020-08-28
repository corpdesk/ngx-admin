import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  slideIndex = [1, 1];
  slideId = ["mySlides1", "mySlides2"];
  public data: object[] = [
    { xval: 1, yval: 20090440 },
    { xval: 2, yval: 20264080 },
    { xval: 3, yval: 20434180 },
    { xval: 4, yval: 21007310 },
    { xval: 5, yval: 21262640 },
    { xval: 6, yval: 21515750 },
    { xval: 7, yval: 21766710 },
    { xval: 8, yval: 22015580 },
    { xval: 9, yval: 22262500 },
    { xval: 10, yval: 22507620 },
  ];
  constructor() { }

  ngOnInit(): void {
    this.showSlides(1, 0);
    this.showSlides(1, 1);
  }

  plusSlides(n, no) {
    this.showSlides(this.slideIndex[no] += n, no);
  }

  showSlides(n, no) {
    var i;
    var x = document.getElementsByClassName(this.slideId[no]);
    if (n > x.length) { this.slideIndex[no] = 1 }
    if (n < 1) { this.slideIndex[no] = x.length }
    for (i = 0; i < x.length; i++) {
      (x[i] as HTMLElement).style.display = "none";
    }
    (x[this.slideIndex[no] - 1] as HTMLElement).style.display = "block";
  }

}
