import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { AboutComponent } from './about/about.component';
import { EventsComponent } from './events/events.component';
import { ResourcesComponent } from './resources/resources.component';
import { ServicesComponent } from './services/services.component';
import { ProductsComponent } from './products/products.component';


@NgModule({
  declarations: [HomeComponent, NewsFeedComponent, AboutComponent, EventsComponent, ResourcesComponent, ServicesComponent, ProductsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
