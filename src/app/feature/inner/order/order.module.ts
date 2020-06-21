import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CustomerAddEditComponent } from '../customer/customer-add-edit/customer-add-edit.component';
import { CustomerLookupComponent } from '../customer/customer-lookup/customer-lookup.component';
import { CustomerModule } from '../customer/customer.module';
import { OrderAddEditComponent } from './order-add-edit/order-add-edit.component';
import { OrderConfigurePagesComponent } from './order-configure-pages/order-configure-pages.component';
import { OrderListTableViewComponent } from './order-list-table-view/order-list-table-view.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderPageTasksComponent } from './order-page-tasks/order-page-tasks.component';
import { OrderProfileSummaryComponent } from './order-profile-summary/order-profile-summary.component';
import { OrderProfileComponent } from './order-profile/order-profile.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderTasksComponent } from './order-tasks/order-tasks.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { SubOrderListTableViewComponent } from './sub-order-list-table-view/sub-order-list-table-view.component';
import { OrderWorkflowComponent } from './order-workflow/order-workflow.component';
import { OrderSummaryPdfComponent } from './order-summary-pdf/order-summary-pdf.component';
import { OrderAttachmentComponent } from './order-attachment/order-attachment.component';
import { NavigationGuard } from '@core/services/navigation-guard.service';
@NgModule({
  declarations: [
    OrderListComponent,
    OrderListTableViewComponent,
    OrderConfigurePagesComponent,
    OrderAddEditComponent,
    OrderProfileComponent,
    OrderProfileSummaryComponent,
    SubOrderListTableViewComponent,
    OrderViewComponent,
    OrderPageTasksComponent,
    OrderTasksComponent,
    OrderWorkflowComponent,
    OrderSummaryPdfComponent,
    OrderAttachmentComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    CustomerModule
  ],
  exports: [
    OrderProfileSummaryComponent,
    OrderPageTasksComponent,
    SubOrderListTableViewComponent,
    OrderTasksComponent,
    OrderSummaryPdfComponent
  ],
  entryComponents: [
    CustomerLookupComponent,
    CustomerAddEditComponent,
    OrderConfigurePagesComponent,
    OrderWorkflowComponent
  ],
  providers: [
    NavigationGuard
  ]
})
export class OrderModule { }
