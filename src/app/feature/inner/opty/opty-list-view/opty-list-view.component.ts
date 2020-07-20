import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { OptyService } from '@core/services/entities/opty.service';
import { Opportunity } from '@shared/models/opty.model';
import { merge, of, Subject } from 'rxjs';
import { map, startWith, switchMap, catchError, debounceTime } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator, MatDialogConfig, MatDialog, MatSort } from '@angular/material';
import { CreateOptyDialogComponent } from '../create-opty-dialog/create-opty-dialog.component';
import { Router } from '@angular/router';
import { SearchParams } from '@shared/models/searchParams.model';
import { SearchResponse } from '@shared/models/searchresponse.model';
import { HttpResponse } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { TimeLineService } from '@core/services/entities/timeline.service';
@Component({
  selector: 'app-opty-list-view',
  templateUrl: './opty-list-view.component.html',
  styleUrls: ['./opty-list-view.component.scss']
})
export class OptyListViewComponent implements OnInit, AfterViewInit {

  showSpinner = false;
  displayedColumns = ['id', 'name', 'status', 'source', 'dueDate', 'priority', 'accounts_name', 'actions'];
  optys: Opportunity[] = [];
  dataSource: MatTableDataSource<Opportunity>;
  isLoadingResults = false;
  itemPerPage = 15;
  resultsLength = 0;
  searchForm: FormGroup;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private subject: Subject<string> = new Subject();
  constructor(
    private optyService: OptyService,
    private dialog: MatDialog,
    private router: Router,
    private timeLineService: TimeLineService
  ) { }

  ngOnInit() {
    this.buildSearchForm();

  }
  ngAfterViewInit(): void {
    this.getOptys();
    this.subject.pipe(
      debounceTime(500)
    ).subscribe(searchTextValue => {
      this.getOptys(searchTextValue);
    });
  }
  createNewOpty_OnClick() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minHeight = '60%';
    const dialogRef = this.dialog.open(CreateOptyDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(optyId => {
      if (!optyId) {
        return;
      }
      this.timeLineService.createTimeLine('New Opportunity Created', optyId).subscribe(r => {
        console.log(r)
        this.gotoOptyDetailsView(optyId);
      });

    });
  }


  buildSearchForm() {
    this.searchForm = new FormGroup({
      searchString: new FormControl(null)
    });
  }

  onKeyUp(searchTextValue: string) {
    this.subject.next(searchTextValue);
  }

  gotoOptyDetailsView(id: number) {
    this.router.navigateByUrl(`opportunity/${id}`);
  }

  getOptys(searchText = null) {
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

          return this.optyService.getOptySearch(searchParams);
        }),
        map((data: HttpResponse<SearchResponse<Opportunity[]>>) => {
          this.isLoadingResults = false;
          this.resultsLength = data.body.totalElements;
          return data.body.content;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return of([]);
        })
      ).subscribe(data => {
        this.optys = data;
      });
  }
}
