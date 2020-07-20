import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteListComponent } from './quote-list/quote-list.component';
import { QuoteRoutingModule } from './quote-routing.module';
import { SharedModule } from '@shared/shared.module';
import { QuoteSummaryComponent } from './quote-summary/quote-summary.component';
import { SchedulerComponent } from '../scheduler/kitchensink/scheduler.component';
import { SchedulerModule } from '../scheduler/scheduler.module';
import { CreateQuoteLineModalComponent } from './create-quote-line-modal/create-quote-line-modal.component';
@NgModule({
  declarations: [QuoteListComponent, QuoteSummaryComponent, CreateQuoteLineModalComponent],
  imports: [CommonModule, SharedModule, QuoteRoutingModule, SchedulerModule],
  exports: [QuoteSummaryComponent],
  entryComponents: [SchedulerComponent],
})
export class QuoteModule { }
