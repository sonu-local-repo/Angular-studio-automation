import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { WebAccess } from '@shared/enums/web-access.enum';
import { ScreenName } from '@shared/enums/screen-name.enum';
import { OrderProfileComponent } from '../order/order-profile/order-profile.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: CustomerListComponent,
                data: {
                    breadcrumb: 'All',
                    screenId: ScreenName.Customer_List,
                    // permissionsRequired: [WebAccess.View]
                }
            },
            {
                path: ':customerId',
                component: CustomerProfileComponent,
                data: {
                    breadcrumb: ':customerName',
                    screenId: ScreenName.Customer_Profile,
                    // permissionsRequired: [WebAccess.View]
                }
            }
        ])
    ],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
