import { Component, OnInit } from '@angular/core';
import { CarouselData } from '../../cd-palette/cd-palette-model';

@Component({
  selector: 'ngx-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {
  newsCarousolData: CarouselData = {
    title: "Latest",
    autoSetting:{
      active: false,
      timeOut: 5000
    },
    content: [
      {
        numbertext: '1 / 3',
        src: '../../../../assets/cd/imges/img_mountains_wide.jpg',
        style: 'width:100%',
        caption: 'Caption Text'
      },
      {
        numbertext: '2 / 3',
        src: '../../../../assets/cd/imges/img_nature_wide.jpg',
        style: 'width:100%',
        caption: 'Caption Two'
      },
      {
        numbertext: '3 / 3',
        src: '../../../../assets/cd/imges/img_snow_wide.jpg',
        style: 'width:100%',
        caption: 'Caption Three'
      }
    ]
  };
  constructor() { }

  ngOnInit(): void {
  }
}
