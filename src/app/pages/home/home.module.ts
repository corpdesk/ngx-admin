import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CdPaletteModule } from '../cd-palette/cd-palette.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { AboutComponent } from './about/about.component';
import { EventsComponent } from './events/events.component';
import { ResourcesComponent } from './resources/resources.component';
import { ServicesComponent } from './services/services.component';
import { ProductsComponent } from './products/products.component';

import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';


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
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    FontAwesomeModule,
    CdPaletteModule,
    HomeRoutingModule
  ],
  exports:[NewsFeedComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
