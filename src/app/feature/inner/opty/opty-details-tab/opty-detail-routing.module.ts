import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OptyDetailsTabComponent } from './opty-details-tab.component';
import { OptyDetailsQuoteComponent } from './opty-details-quote/opty-details-quote.component';
import { OptyDetailsJobsComponent } from './opty-details-jobs/opty-details-jobs.component';
import { OptyDetailsEstimateComponent } from './opty-details-estimate/opty-details-estimate.component';
import { OptyDetailsActivityComponent } from './opty-details-activity/opty-details-activity.component';
import { OptyDetailsScheduleComponent } from './opty-details-schedule/opty-details-schedule.component';
import { OptyDetailsInvoiceComponent } from './opty-details-invoice/opty-details-invoice.component';
import { OptyDetailsSubtabComponent } from './opty-details-moredetails/opty-details-subtab.component';
import { OptyJobDetailsComponent } from './opty-job-details/opty-job-details.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: OptyDetailsTabComponent,
                children: [
                    {
                        path: '',
                        component: OptyDetailsSubtabComponent
                    },
                    {
                        path: 'quotes',
                        component: OptyDetailsQuoteComponent,
                    },
                    {
                        path: 'jobs',
                        component: OptyDetailsJobsComponent,
                    },
                    {
                        path: 'jobs/:jobId',
                        component: OptyJobDetailsComponent,
                    },
                    {
                        path: 'estimate',
                        component: OptyDetailsEstimateComponent,
                    },
                    {
                        path: 'activity',
                        component: OptyDetailsActivityComponent,
                    },
                    {
                        path: 'schedule',
                        component: OptyDetailsScheduleComponent,
                    },
                    {
                        path: 'invoice',
                        component: OptyDetailsInvoiceComponent,
                    }


                ]
            },
        ])
    ],
    exports: [RouterModule]
})
export class OptyDetailsRoutingModule { }
