import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../cd-auth/auth-guard.service';

import { ExtraComponentsComponent } from './extra-components.component';
import { AlertComponent } from './alert/alert.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { CalendarKitFullCalendarShowcaseComponent } from './calendar-kit/calendar-kit.component';

const routes: Routes = [{
  path: '',
  component: ExtraComponentsComponent,
  canActivate: [ AuthGuardService ],
  children: [
    {
      path: 'calendar',
      component: CalendarComponent,
      canActivate: [ AuthGuardService ],
    },
    {
      path: 'progress-bar',
      component: ProgressBarComponent,
      canActivate: [ AuthGuardService ],
    },
    {
      path: 'spinner',
      component: SpinnerComponent,
      canActivate: [ AuthGuardService ],
    },
    {
      path: 'alert',
      component: AlertComponent,
      canActivate: [ AuthGuardService ],
    },
    {
      path: 'calendar-kit',
      component: CalendarKitFullCalendarShowcaseComponent,
      canActivate: [ AuthGuardService ],
    },
    {
      path: 'chat',
      component: ChatComponent,
      canActivate: [ AuthGuardService ],
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtraComponentsRoutingModule {
}
