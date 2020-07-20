import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { JobsSummaryComponent } from './jobs-summary/jobs-summary.component';


const routes: Routes = [
    { path: '', component: JobsSummaryComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JobsRoutingModule {}
