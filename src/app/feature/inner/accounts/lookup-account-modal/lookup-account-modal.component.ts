import { Component, OnInit, Inject, ViewChild, Input, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatPaginator, MatTableDataSource, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { merge, Subject, of } from 'rxjs';
import { startWith, switchMap, map, catchError, debounceTime } from 'rxjs/operators';
import { SearchParams } from '@shared/models/searchParams.model';
import { AccountsService } from '@core/services/entities/accounts.service';
import { HttpResponse } from '@angular/common/http';
import { SearchResponse } from '@shared/models/searchresponse.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Account } from '@shared/models/account.model';

@Component({
  selector: 'app-lookup-account-modal',
  templateUrl: './lookup-account-modal.component.html',
  styleUrls: ['./lookup-account-modal.component.scss']
})
export class LookupAccountModalComponent implements OnInit, AfterViewInit {
  searchForm: FormGroup;
  private subject: Subject<string> = new Subject();
  accountsList: Account[];
  dataSource: MatTableDataSource<Account>;
  displayedColumns = ['select', 'id', 'name', 'mobile', 'email', 'address'];
  selectedRowIndex = -1;
  selection = new SelectionModel<Account>(true, []);

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountsService,
    private dialogRef: MatDialogRef<LookupAccountModalComponent>,
    @Inject(MAT_DIALOG_DATA) private inputData: any

  ) { }

  @ViewChild(MatPaginator, { static: false }) matPaginator: MatPaginator;

  ngOnInit() {
    this.buildform();
    if (this.inputData) {
      this.searchForm.get('searchString').setValue(this.inputData.data);
      this.search(this.inputData.data);
    }
  }

  ngAfterViewInit() {
    this.subject.pipe(debounceTime(500)).subscribe(searchString => {
      this.search(searchString);
    });
  }

  buildform() {
    this.searchForm = this.formBuilder.group({
      searchString: ['']
    });
  }

  highlight(row) {
    // this.selectedRowIndex = row.id;
    this.toggleSelection(row);
  }


  onKeyUp(searchTextValue: string) {
    this.subject.next(searchTextValue);
  }

  search(searchText = null) {
    const searchParams = new SearchParams();
    searchParams.searchString = searchText;
    searchParams.size = 50;
    searchParams.sortBy = 'id';
    searchParams.sortDirection = 'desc';
    this.accountService.getAccounts(searchParams).pipe(
      map((data: HttpResponse<SearchResponse<Account[]>>) => {
        return data.body.content;
      }),
      catchError(() => {
        return of([]);
      })
    ).subscribe(data => {
      console.log(data);
      this.accountsList = data;
      this.dataSource = new MatTableDataSource(this.accountsList);
    });
  }

  toggleSelection(row) {
    if (!this.selection.hasValue()) {
      this.selection.toggle(row);
    } else {
      this.selection.clear();
      this.selection.select(row);
    }
  }

  saveSelection() {
    console.log('dialogref');
    this.dialogRef.close({
      id: this.selection.selected[0].id,
      name: this.selection.selected[0].name});
  }
}
