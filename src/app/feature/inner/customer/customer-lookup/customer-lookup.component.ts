import {Component, OnInit, ViewChild, AfterViewInit, Inject} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MatPaginator, MatSort } from '@angular/material';
import { ModalService } from '@shared/services/modal.service';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { CustomerAddEditComponent } from '../customer-add-edit/customer-add-edit.component';
import { CustomerService } from '../customer.service';
import { CustomerFilterParams } from '../models/customer-filter-params.model';
import { Customer } from '../models/customer.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-customer-lookup',
  templateUrl: './customer-lookup.component.html',
  styleUrls: ['./customer-lookup.component.scss']
})
export class CustomerLookupComponent implements OnInit, AfterViewInit {

  resultsLength = 0;
  itemPerPage = 5;
  isLoadingResults = true;
  isRateLimitReached = false;
  searchCounter = 0;
  searchForm: FormGroup;
  customerList: Customer[] = [];
  displayedColumns: string[] = ['name', 'mobile', 'phone', 'email', 'actions'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private customerService: CustomerService,
    private modalService: ModalService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CustomerLookupComponent>
  ) {

  }

  /* Lifecycle Hooks */
  ngOnInit() {
    this.buildForm();
  }

  ngAfterViewInit() {

    this.getCustomers();
  }

  /* Private Methods */
  private buildForm() {
    this.searchForm = new FormGroup({
      name: new FormControl(this.data),
      mobile: new FormControl(''),
    });
  }

  private getCustomers() {

    if (!this.sort) { return; }
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const customerFilterParams = new CustomerFilterParams();
          this.searchCounter = this.data ? 1 : this.searchCounter;
          customerFilterParams.name =   this.data ? this.data : this.searchForm.value.name;
          customerFilterParams.mobile = this.searchForm.value.mobile;
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

  /* Public Methods */
  onSearch() {
    if (this.searchForm.value.name !== '' || this.searchForm.value.mobile !== '') {
      this.searchCounter++;
      this.getCustomers();
    }
  }

  onClearSearch() {
    this.searchForm.patchValue({
      name: '',
      mobile: '',
    });
    this.searchCounter = 0;
    this.data = null;
    this.getCustomers();
  }

  addCustomer() {
    const dialogConfig = this.modalService.setDialogConfig(true, true, '780px');
    this.dialog.open(CustomerAddEditComponent, dialogConfig)
      .afterClosed().subscribe(customer => {
        if (customer) {
          this.dialogRef.close(customer);
        }
      });
  }

  attachCustomerToOrder(customer: Customer) {
    this.dialogRef.close(customer);
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
