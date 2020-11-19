import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ToastrModule } from 'ngx-toastr';
import { AlertModule } from '../_alert/alert.module';
import { NotifierModule } from "angular-notifier";
import { NgGanttEditorModule } from 'ng-gantt';
import { TooltipModule } from 'ngx-bootstrap/tooltip';




import { CdPaletteRoutingModule } from './cd-palette-routing.module';
import { CarouselComponent } from './carousel/carousel.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbTreeGridModule,
  NbTooltipModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule as ngFormsModule } from '@angular/forms';

// import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProfileAccordionComponent } from './profile-accordion/profile-accordion.component';
import { ProfileTwitterComponent } from './profile-twitter/profile-twitter.component';
import { FriblyTreeComponent } from './fribly-tree/fribly-tree.component';
import { CheckListComponent } from './check-list/check-list.component';
import { TreeGridComponent, FsIconComponent } from './tree-grid/tree-grid.component';
import { GuigTableComponent } from './guig-table/guig-table.component';
import { CheckBoxComponent } from './check-box/check-box.component';
import { AlertifyComponent } from './alertify/alertify.component';
import { TabLoaderComponent } from './tab-loader/tab-loader.component';
import { TabDirective } from '../../@cd/guig/directives/tab.directive';
import { SelectSearchComponent } from './select-search/select-search.component';
import { GanttOneComponent } from './gantt-one/gantt-one.component';
import { GanttTwoComponent } from './gantt-two/gantt-two.component';
import { GanttThreeComponent } from './gantt-three/gantt-three.component';
import { GanttFourComponent } from './gantt-four/gantt-four.component';
import { GanttFiveComponent } from './gantt-five/gantt-five.component';
import { GanttSixComponent } from './gantt-six/gantt-six.component';
import { GanttSevenComponent } from './gantt-seven/gantt-seven.component';
import { GanttEightComponent } from './gantt-eight/gantt-eight.component';
import { ScrollableDirective } from './scrollable.directive';
import { HighlightDirective } from './highlight.directive';
import { CdTooltipDirective } from './cd-tooltip.directive';
import { GuigFontsComponent } from './guig-fonts/guig-fonts.component';
import { GanttNineComponent } from './gantt-nine/gantt-nine.component';
import { GanttTenComponent } from './gantt-ten/gantt-ten.component';

const materialModules = [
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatRadioModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatDividerModule,
  MatChipsModule,
  MatIconModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [
    CarouselComponent, 
    ProfileCardComponent, 
    ProfileAccordionComponent, 
    ProfileTwitterComponent, FriblyTreeComponent, CheckListComponent, TreeGridComponent,FsIconComponent, GuigTableComponent, CheckBoxComponent, AlertifyComponent, TabLoaderComponent,
    TabDirective,
    SelectSearchComponent,
    GanttOneComponent,
    GanttTwoComponent,
    GanttThreeComponent,
    GanttFourComponent,
    GanttFiveComponent,
    GanttSixComponent,
    GanttSevenComponent,
    GanttEightComponent,
    ScrollableDirective,
    HighlightDirective,
    CdTooltipDirective,
    GuigFontsComponent,
    GanttNineComponent,
    GanttTenComponent,
  ],
  imports: [
    CommonModule,
    NgxMatSelectSearchModule,
    CdPaletteRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgGanttEditorModule,
    TooltipModule.forRoot(),
    AlertModule,
    FontAwesomeModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    NbTreeGridModule,
    NbTooltipModule,
    // NotifierModule.withConfig({
    //   position: {
    //     horizontal: {
    //       position: "right",
    //       distance: 12
    //     },
    //     vertical: {
    //       position: "top",
    //       distance: 100,
    //       gap: 10
    //     }
    //   },
    //   theme: "material",
    //   behaviour: {
    //     autoHide: 5000,
    //     onClick: false,
    //     onMouseover: "pauseAutoHide",
    //     showDismissButton: true,
    //     stacking: 4
    //   },
    //   animations: {
    //     enabled: true,
    //     show: {
    //       preset: "slide",
    //       speed: 300,
    //       easing: "ease"
    //     },
    //     hide: {
    //       preset: "fade",
    //       speed: 300,
    //       easing: "ease",
    //       offset: 50
    //     },
    //     shift: {
    //       speed: 300,
    //       easing: "ease"
    //     },
    //     overlap: 150
    //   }}),
    ...materialModules,
  ],
  exports:[
    CarouselComponent, 
    ProfileCardComponent,
    ProfileAccordionComponent,
    ProfileTwitterComponent,
    FriblyTreeComponent,
    CheckListComponent,
    TreeGridComponent,
    FsIconComponent,
    AlertifyComponent,
    GuigTableComponent,
    TabLoaderComponent,
    SelectSearchComponent,
    GanttOneComponent,
    GanttTwoComponent,
    GanttThreeComponent,
    GanttFourComponent,
    GanttFiveComponent,
    GanttSixComponent,
    GanttSevenComponent,
    GanttEightComponent,
    GanttNineComponent,
    GanttTenComponent,
    GuigFontsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CdPaletteModule { }
