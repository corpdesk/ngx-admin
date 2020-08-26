import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CdPaletteModule } from '../cd-palette/cd-palette.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { AboutComponent } from './about/about.component';
import { EventsComponent } from './events/events.component';
import { ResourcesComponent } from './resources/resources.component';
import { ServicesComponent } from './services/services.component';
import { ProductsComponent } from './products/products.component';
// import { CarouselComponent } from '../cd-palette/carousel/carousel.component';


@NgModule({
  declarations: [
    HomeComponent, 
    NewsFeedComponent, 
    AboutComponent, 
    EventsComponent, 
    ResourcesComponent, 
    ServicesComponent, 
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    SlickCarouselModule,
    CdPaletteModule,
    HomeRoutingModule
  ],
  exports:[NewsFeedComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
