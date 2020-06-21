import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ModalService } from '@shared/services/modal.service';
import { EmployeeFilterParams } from 'app/feature/inner/employee/models/employee-filter-params.model';
import { Employee } from 'app/feature/inner/employee/models/employee.model';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { EmployeeAddEditComponent } from '../employee-add-edit/employee-add-edit.component';
import { EmployeeService } from '../employee.service';
import { PermissionService } from '@core/services/permission.service';
import { ScreenName } from '@shared/enums/screen-name.enum';

@Component({
  selector: 'app-employee-list-table-view',
  templateUrl: './employee-list-table-view.component.html',
  styleUrls: ['./employee-list-table-view.component.scss']
})
export class EmployeeListTableViewComponent implements AfterViewInit, OnChanges {

  resultsLength = 0;
  itemPerPage = 15;
  isLoadingResults = true;
  isRateLimitReached = false;
  employeeList: Employee[] = [];
  displayedColumns: string[] = ['firstName', 'username', 'gender', 'phone', 'email', 'dob', 'actions'];
  screenName = ScreenName;

  @Input() searchCriteria: EmployeeFilterParams;
  @Input() searchCounter: number;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private modalService: ModalService,
    private employeeService: EmployeeService,
    public permissionService: PermissionService,
  ) { }

  /* Lifecycle Hooks */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.searchCounter && changes.searchCounter.previousValue !== changes.searchCounter.currentValue) {
      if (this.paginator) { this.paginator.pageIndex = 0; }
      this.getEmployees();
    }
  }

  ngAfterViewInit() {
    this.getEmployees();
  }

  /* Public Methods */
  getEmployees() {
    if (!this.sort) { return; }
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          // console.log(this.searchCriteria);
          const employeeFilterParams = new EmployeeFilterParams();
          employeeFilterParams.firstName = this.searchCriteria.firstName;
          employeeFilterParams.lastName = this.searchCriteria.lastName;
          employeeFilterParams.sortBy = this.sort.active;
          employeeFilterParams.sortDirection = this.sort.direction;
          employeeFilterParams.page = this.paginator.pageIndex;
          employeeFilterParams.size = this.itemPerPage;
          return this.employeeService.getAllEmployees(employeeFilterParams);
        }),
        map(data => {
          // console.log(data);
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalElements;
          return data.content;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => {
        // console.log(data);
        this.employeeList = data;
      });
  }

  showEmployeeProfile(employeeId: number) {
    this.router.navigateByUrl(`employees/${employeeId}`);
  }

  editEmployeeProfile(employee: Employee) {
    const dialogConfig = this.modalService.setDialogConfig(true, true, '780px', { employee });
    this.dialog.open(EmployeeAddEditComponent, dialogConfig)
      .afterClosed().subscribe(reload => {
        if (reload) {
          this.getEmployees();
        }
      });
  }
}
