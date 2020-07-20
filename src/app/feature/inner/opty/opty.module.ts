import { OptyListViewComponent } from './opty-list-view/opty-list-view.component';
import { NgModule } from '@angular/core';
import { OptyRoutingModule } from './opty-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CreateOptyDialogComponent } from './create-opty-dialog/create-opty-dialog.component';
import { OptyDetailsViewComponent } from './opty-details-view/opty-details-view.component';
import { QuoteModule } from '../quote/quote.module';
import { JobsModule } from '../jobs/jobs.module';
import { EstimatingModule } from '../estimate/estimate.module';
import { LookupAccountModalComponent } from '../accounts/lookup-account-modal/lookup-account-modal.component';
import { AccountModule } from '../accounts/account.module';
import {MatProgressBarModule} from '@angular/material';
import { JobsSummaryComponent } from '../jobs/jobs-summary/jobs-summary.component';

@NgModule({
  declarations: [
    OptyListViewComponent,
    CreateOptyDialogComponent,
    OptyDetailsViewComponent,
  ],

  imports: [CommonModule,
    OptyRoutingModule,
    SharedModule,
    QuoteModule,
    JobsModule,
    EstimatingModule,
    AccountModule,
    MatProgressBarModule
  ],
  entryComponents: [
    LookupAccountModalComponent
  ]
})
export class OptyModule { }
