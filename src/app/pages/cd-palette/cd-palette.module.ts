import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CdPaletteRoutingModule } from './cd-palette-routing.module';
import { CarouselComponent } from './carousel/carousel.component';


@NgModule({
  declarations: [CarouselComponent],
  imports: [
    CommonModule,
    CdPaletteRoutingModule
  ],
  exports:[CarouselComponent]
})
export class CdPaletteModule { }
