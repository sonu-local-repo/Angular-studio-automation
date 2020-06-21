import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '@shared/components/layout/breadcrumb/breadcrumb.service';
import { ErrorService } from '@shared/services/error.service';
import { EmployeeScreenViewGroup } from '../../settings/models/employee-screen-view-group.model';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee.model';
import { EmployeeScreenView } from '../../settings/models/employee-screen-view.model';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {

  employeeDetails: Employee;
  employeeId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private breadcrumbService: BreadcrumbService,
    private errorService: ErrorService,
  ) { }

  /* Lifecycle Hooks */
  ngOnInit() {
    this.initVariables();
    this.getEmployee();
  }

  /* Private Methods */
  private initVariables() {
    this.employeeId = parseInt(this.activatedRoute.snapshot.paramMap.get('employeeId'), 0);
  }

  private getEmployee() {

    if (isNaN(this.employeeId)) {
      this.errorService.showSomeThingWentWrongMessage();
      return;
    }

    this.employeeService.getEmployee(this.employeeId)
      .subscribe(
        (data) => {
          this.employeeDetails = data;
          this.breadcrumbService.updateDynamicList(':employeeName', `${this.employeeDetails.firstName} ${this.employeeDetails.lastName}`);
        },
        (error) => {
          this.errorService.showSomeThingWentWrongMessage();
        }
      );
  }
}
