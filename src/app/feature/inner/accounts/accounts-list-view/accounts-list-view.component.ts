import { Component, OnInit, AfterViewInit, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { AccountsService } from '@core/services/entities/accounts.service';
import { Account } from '@shared/models/account.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { merge, of, Subject } from 'rxjs';
import { catchError, map, startWith, switchMap, debounceTime } from 'rxjs/operators';
import { SearchParams } from '@shared/models/searchParams.model';
import { HttpResponse } from '@angular/common/http';
import { SearchResponse } from '@shared/models/searchresponse.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CreateAccountModalComponent } from '../create-account-modal/create-account-modal.component';
@Component({
  selector: 'app-accounts-list-view',
  templateUrl: './accounts-list-view.component.html'
})
export class AccountsListViewComponent implements OnInit, AfterViewInit, OnChanges {

  accountsList: Account[] = [];
  dataSource: MatTableDataSource<Account>;
  showSpinner = false;
  displayedColumns = ['id', 'name', 'address', 'status', 'mobile', 'phone', 'email', 'actions'];
  totalRecords = 0;
  selectedRowIndex = -1;
  isLoadingResults = false;
  resultsLength = 0;
  itemPerPage = 15;

  searchForm: FormGroup;
  private subject: Subject<string> = new Subject();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(
    private accountService: AccountsService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.buildSearchForm();
    this.showSpinner = true;

  }
  ngAfterViewInit() {
    this.getAccounts();
    this.subject.pipe(
      debounceTime(500)
    ).subscribe(searchTextValue => {
      this.getAccounts(searchTextValue);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchCounter && changes.searchCounter.previousValue !== changes.searchCounter.currentValue) {
      if (this.paginator) { this.paginator.pageIndex = 0; }
      this.getAccounts();
    }
  }

  highlight(row) {
    alert(row.id);
    this.selectedRowIndex = row.id;
  }

  buildSearchForm() {
    this.searchForm = new FormGroup({
      searchString: new FormControl(null)
    });
  }

  onKeyUp(searchTextValue: string) {
    this.subject.next(searchTextValue);
  }

  createAccount() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minHeight = '60%';
    const dialogRef = this.matDialog.open(CreateAccountModalComponent, dialogConfig);
  }

  getAccounts(searchText = null) {
    if (!this.sort) { return; }
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const searchParams = new SearchParams();
          searchParams.sortBy = this.sort.active;
          searchParams.sortDirection = this.sort.direction;
          searchParams.page = this.paginator.pageIndex;
          searchParams.size = this.itemPerPage;
          if (searchText) {
            searchParams.searchString = searchText;
          } else {
            searchParams.searchString = '';
          }

          return this.accountService.getAccounts(searchParams);
        }),
        map((data: HttpResponse<SearchResponse<Account[]>>) => {
          this.isLoadingResults = false;
          this.resultsLength = data.body.totalElements;
          return data.body.content;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return of([]);
        })
      ).subscribe(data => {
        this.accountsList = data;
      });
  }
}
