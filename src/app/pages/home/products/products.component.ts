import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  slideIndex = [1,1];
  slideId = ["mySlides1", "mySlides2"]
  
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
    if (n > x.length) {this.slideIndex[no] = 1}    
    if (n < 1) {this.slideIndex[no] = x.length}
    for (i = 0; i < x.length; i++) {
       (x[i] as HTMLElement).style.display = "none";  
    }
    (x[this.slideIndex[no]-1]  as HTMLElement).style.display = "block";  
  }

}
