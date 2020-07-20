import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SchedulerComponent } from './kitchensink/scheduler.component';
import {CreateScheduleDialogComponent} from './create-schedule-dialog/create-schedule-dialog.component';

const routes: Routes = [
    { path: '', component: SchedulerComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    entryComponents: [CreateScheduleDialogComponent]
})
export class SchedulerRoutingModule {}
