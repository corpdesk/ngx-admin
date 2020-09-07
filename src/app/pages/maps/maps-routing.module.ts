import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../cd-auth/auth-guard.service';

import { MapsComponent } from './maps.component';
import { GmapsComponent } from './gmaps/gmaps.component';
import { LeafletComponent } from './leaflet/leaflet.component';
import { BubbleMapComponent } from './bubble/bubble-map.component';
import { SearchMapComponent } from './search-map/search-map.component';
import { MapComponent } from './search-map/map/map.component';
import { SearchComponent } from './search-map/search/search.component';

const routes: Routes = [{
  path: '',
  component: MapsComponent,
  canActivate: [ AuthGuardService ],
  children: [{
    path: 'gmaps',
    component: GmapsComponent,
    canActivate: [ AuthGuardService ],
  }, {
    path: 'leaflet',
    component: LeafletComponent,
    canActivate: [ AuthGuardService ],
  }, {
    path: 'bubble',
    component: BubbleMapComponent,
    canActivate: [ AuthGuardService ],
  }, {
    path: 'searchmap',
    component: SearchMapComponent,
    canActivate: [ AuthGuardService ],
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsRoutingModule { }

export const routedComponents = [
  MapsComponent,
  GmapsComponent,
  LeafletComponent,
  BubbleMapComponent,
  SearchMapComponent,
  MapComponent,
  SearchComponent,
];
