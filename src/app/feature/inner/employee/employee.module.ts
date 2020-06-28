import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { EmployeeAddEditComponent } from './employee-add-edit/employee-add-edit.component';
import { EmployeeListTableViewComponent } from './employee-list-table-view/employee-list-table-view.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeProfileSummaryComponent } from './employee-profile-summary/employee-profile-summary.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeWebAccessAddEditComponent } from './employee-web-access-add-edit/employee-web-access-add-edit.component';
import { EmployeeResponsibilityComponent } from './employee-responsibility/employee-responsibility.component';
import { ResponsibilityListComponent } from './responsibility-list/responsibility-list.component';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeListTableViewComponent,
    EmployeeProfileComponent,
    EmployeeProfileSummaryComponent,
    EmployeeAddEditComponent,
    EmployeeWebAccessAddEditComponent,
    EmployeeResponsibilityComponent,
    ResponsibilityListComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
  ],
  exports: [
    EmployeeListComponent,
    EmployeeListTableViewComponent,
    EmployeeProfileComponent,
    EmployeeProfileSummaryComponent
  ],
  entryComponents: [
    EmployeeAddEditComponent,
    ResponsibilityListComponent,
    EmployeeWebAccessAddEditComponent
  ],
})
export class EmployeeModule { }
