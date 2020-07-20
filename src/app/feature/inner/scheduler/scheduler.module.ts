import { NgModule } from '@angular/core';
import { SchedulerComponent } from './kitchensink/scheduler.component';
import { SharedModule } from '@shared/shared.module';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CreateScheduleDialogComponent } from './create-schedule-dialog/create-schedule-dialog.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { DatePipe } from '@angular/common';
@NgModule({
    declarations: [
        SchedulerComponent,
        CreateScheduleDialogComponent
    ],
    imports: [
        SharedModule,
        SchedulerRoutingModule,
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory
        }),
        AmazingTimePickerModule,
    ],
    providers: [
        DatePipe
    ]
})
export class SchedulerModule {}
