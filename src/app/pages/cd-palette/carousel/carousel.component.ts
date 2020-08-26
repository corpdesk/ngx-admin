/**
 * Based on https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_slideshow
 * Adopted by @georemo  for angular implementation
 */
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { CarouselData } from '../cd-palette-model';

@Component({
  selector: 'ngx-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit {
  @Input() slideData: CarouselData; // decorate the property with @Input(). Used by consumers to set data
  timeout;
  slideIndex = 1;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    /**
     * launch on auto or manual mode
     * depending on setting at this.slideData
     * by the consuming client
     */
    if(this.slideData.autoSetting.active){
      this.showSlidesAuto();
    } else {
      this.showSlides(this.slideIndex);
    } 
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n) {
    console.log('starting showSlides(n)')
    let i;
    const slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    console.log('slides:', slides);
    const dots = document.getElementsByClassName("dot");
    if (n > slides.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    (slides[this.slideIndex - 1] as HTMLElement).style.display = "block";
    dots[this.slideIndex - 1].className += " active";
  }

  showSlidesAuto() {
    console.log('starting showSlidesAuto(n)')
    let i;
    const slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    this.slideIndex++;
    if (this.slideIndex > slides.length) {
      this.slideIndex = 1;
    }
    if(this.slideIndex){
      console.log('this.slideIndex1:', this.slideIndex);
      (slides[this.slideIndex - 1] as HTMLElement).style.display = "block";
    } else {
      console.log('this.slideIndex2:', this.slideIndex);
      this.slideIndex = 1;
      (slides[this.slideIndex - 1] as HTMLElement).style.display = "block";
    }

    // setTimeout(this.showSlidesAuto, 2000); // Change image every 2 seconds
    this.timeout = setTimeout(() => this.showSlidesAuto(), this.slideData.autoSetting.timeOut);
  }
}
