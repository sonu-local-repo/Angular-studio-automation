import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { ModalService } from '@shared/services/modal.service';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { CustomerAddEditComponent } from '../customer-add-edit/customer-add-edit.component';
import { CustomerService } from '../customer.service';
import { CustomerFilterParams } from '../models/customer-filter-params.model';
import { Customer } from '../models/customer.model';
import { ScreenName } from '@shared/enums/screen-name.enum';
import { PermissionService } from '@core/services/permission.service';

@Component({
  selector: 'app-customer-list-table-view',
  templateUrl: './customer-list-table-view.component.html',
  styleUrls: ['./customer-list-table-view.component.scss']
})
export class CustomerListTableViewComponent implements AfterViewInit, OnChanges {

  resultsLength = 0;
  itemPerPage = 15;
  isLoadingResults = true;
  isRateLimitReached = false;
  customerList: Customer[] = [];
  displayedColumns: string[] = ['name', 'mobile', 'phone', 'email', 'actions'];
  screenName = ScreenName;

  @Input() searchCriteria: CustomerFilterParams;
  @Input() searchCounter: number;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private modalService: ModalService,
    private customerService: CustomerService,
    public permissionService: PermissionService
  ) { }

  /* Lifecycle Hooks */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.searchCounter && changes.searchCounter.previousValue !== changes.searchCounter.currentValue) {
      if (this.paginator) { this.paginator.pageIndex = 0; }
      this.getCustomers();
    }
  }

  ngAfterViewInit() {
    this.getCustomers();
  }

  /* Public Methods */
  getCustomers() {
    if (!this.sort) { return; }
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const customerFilterParams = new CustomerFilterParams();
          customerFilterParams.name = this.searchCriteria.name;
          customerFilterParams.mobile = this.searchCriteria.mobile;
          customerFilterParams.page = this.paginator.pageIndex;
          customerFilterParams.size = this.itemPerPage;
          customerFilterParams.sortBy = this.sort.active;
          customerFilterParams.sortDirection = this.sort.direction;
          return this.customerService.getAllCustomers(customerFilterParams);
        }),
        map(data => {
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
        this.customerList = data;
      });
  }

  showCustomerProfile(customerId: number) {
    this.router.navigateByUrl(`customers/${customerId}`);
  }

  editCustomerProfile(customer: Customer) {
    const dialogConfig = this.modalService.setDialogConfig(true, true, '780px', { customer });
    this.dialog.open(CustomerAddEditComponent, dialogConfig)
      .afterClosed().subscribe(reload => {
        if (reload) {

        }
      });
  }
}
