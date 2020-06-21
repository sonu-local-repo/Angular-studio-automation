import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CanDeactivateGuardService } from '@core/services/can-deactivate-guard.service';
import { WebAccess } from '@shared/enums/web-access.enum';
import { OrderAddEditComponent } from './order-add-edit/order-add-edit.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderProfileComponent } from './order-profile/order-profile.component';
import {OrderTasksComponent} from "./order-tasks/order-tasks.component";
import { NavigationGuard } from '@core/services/navigation-guard.service';
@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: OrderListComponent,
                data: {
                    breadcrumb: 'All',
                    screenId: 'Order_List',
                    // permissionsRequired: [WebAccess.View]
                }
            },
            {
                path: 'new',
                component: OrderAddEditComponent,
                canDeactivate: [CanDeactivateGuardService],
                data: {
                    breadcrumb: 'New',
                    screenId: 'Order_Profile',
                    // permissionsRequired: [WebAccess.Edit]
                }
            },
            {
                path: ':orderId',
                component: OrderProfileComponent,
                data: {
                    breadcrumb: ':orderId',
                    screenId: 'Order_Profile',
                    // permissionsRequired: [WebAccess.View]
                },

            },

            {
                path: ':orderId/edit',
                component: OrderAddEditComponent,
                data: {
                    breadcrumb: ':orderId',
                    screenId: 'Order_Profile',
                    // permissionsRequired: [WebAccess.Edit]
                }
            },
        ])
    ],
    exports: [RouterModule]
})
export class OrderRoutingModule { }


