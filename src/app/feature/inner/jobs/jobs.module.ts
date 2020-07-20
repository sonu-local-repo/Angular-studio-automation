import { NgModule } from '@angular/core';
import { JobsSummaryComponent } from './jobs-summary/jobs-summary.component';
import { CommonModule } from '@angular/common';
import { JobsRoutingModule } from './jobs-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [JobsSummaryComponent],
  imports: [CommonModule, SharedModule, JobsRoutingModule],
  exports: [JobsSummaryComponent]
})
export class JobsModule {}
