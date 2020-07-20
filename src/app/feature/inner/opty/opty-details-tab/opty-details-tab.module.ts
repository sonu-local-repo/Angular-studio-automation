import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OptyDetailsRoutingModule } from './opty-detail-routing.module';
import { OptyDetailsSubtabComponent } from './opty-details-moredetails/opty-details-subtab.component';
import { OptyDetailsQuoteComponent } from './opty-details-quote/opty-details-quote.component';
import { OptyDetailsTabComponent } from './opty-details-tab.component';
import { OptyDetailsJobsComponent } from './opty-details-jobs/opty-details-jobs.component';
import { OptyDetailsScheduleComponent } from './opty-details-schedule/opty-details-schedule.component';
import { OptyDetailsEstimateComponent } from './opty-details-estimate/opty-details-estimate.component';
import { OptyDetailsActivityComponent } from './opty-details-activity/opty-details-activity.component';
import { OptyDetailsInvoiceComponent } from './opty-details-invoice/opty-details-invoice.component';
import { QuoteModule } from '../../quote/quote.module';
import { DataTransferService } from '@shared/services/dataTransferService.service';
import { EstimatingModule } from '../../estimate/estimate.module';
import { OptyDetailsSidepanelComponent } from './opty-details-sidepanel/opty-details-sidepanel.component';
import { JobsModule } from '../../jobs/jobs.module';
import { OptyActionsComponent } from './opty-actions/opty-actions.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { OptyTimelineComponent } from './opty-timeline/opty-timeline.component';
import { OptyJobDetailsComponent } from './opty-job-details/opty-job-details.component';

@NgModule({
  declarations: [
    OptyDetailsTabComponent,
    OptyDetailsQuoteComponent,
    OptyDetailsSubtabComponent,
    OptyDetailsJobsComponent,
    OptyDetailsScheduleComponent,
    OptyDetailsEstimateComponent,
    OptyDetailsActivityComponent,
    OptyDetailsInvoiceComponent,
    OptyDetailsSidepanelComponent,
    OptyActionsComponent,
    OptyTimelineComponent,
    OptyJobDetailsComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    OptyDetailsRoutingModule,
    QuoteModule,
    EstimatingModule,
    JobsModule,
    CKEditorModule
  ],
  providers: [
    DataTransferService
  ]
})
export class OptyDetailsTabsModule { }

