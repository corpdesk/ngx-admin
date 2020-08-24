import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { AboutComponent } from './about/about.component';
import { EventsComponent } from './events/events.component';
import { ResourcesComponent } from './resources/resources.component';
import { ServicesComponent } from './services/services.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: '',
    component: NewsFeedComponent,
    children: [
      {
        path: 'news-feed',
        component: NewsFeedComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'events',
        component: EventsComponent,
      },
      {
        path: 'resources',
        component: ResourcesComponent,
      },
      {
        path: 'services',
        component: ServicesComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
