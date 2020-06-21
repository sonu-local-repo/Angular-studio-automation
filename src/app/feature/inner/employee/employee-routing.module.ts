import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WebAccess } from '@shared/enums/web-access.enum';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { ScreenName } from '@shared/enums/screen-name.enum';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: EmployeeListComponent,
                data: {
                    breadcrumb: 'All',
                    screenId: ScreenName.Employee_List,
                    // permissionsRequired: [WebAccess.View]
                }
            },
            {
                path: ':employeeId',
                component: EmployeeProfileComponent,
                data: {
                    breadcrumb: ':employeeName',
                    screenId: ScreenName.Employee_Profile,
                    // permissionsRequired: [WebAccess.View]
                }
            }
        ])
    ],
    exports: [RouterModule]
})
export class EmployeeRoutingModule { }
