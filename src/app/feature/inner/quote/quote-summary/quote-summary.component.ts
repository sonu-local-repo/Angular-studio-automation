import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Quote } from '@shared/models/quote.model';
import { MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { QuoteLineItem } from '@shared/models/quotelineitem.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { SchedulerComponent } from '../../scheduler/kitchensink/scheduler.component';
import { SchedulerArguments } from '@shared/models/scheduler.argument.model'
import { Router, ActivatedRoute } from '@angular/router';
import { CreateQuoteLineModalComponent } from '../create-quote-line-modal/create-quote-line-modal.component';
import { QuoteService } from '@core/services/entities/quote.service';
import { CreateEstimateComponent } from '../../estimate/create-estimate/create-estimate.component';
import { TimeLineService } from '@core/services/entities/timeline.service';
import { DataTransferService } from '@shared/services/dataTransferService.service';
@Component({
  selector: 'app-quote-summary',
  templateUrl: './quote-summary.component.html',
  styleUrls: ['./quote-summary.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuoteSummaryComponent implements OnInit {
  // @Input() quoteId: number;
  @Input() quoteLinesInput: QuoteLineItem[];
  @Input() optyId: number;
  @Input() quoteId: number;
  @Output() quoteLineCreated = new EventEmitter();
  selection = new SelectionModel<QuoteLineItem>(true, []);
  // quote: Quote;
  // optyId: number;
  panelOpenState = false;
  // displayedColumns = ['select', 'id', 'type', 'status', 'dueDate', 'owner', 'source', 'rate', 'description'];
  displayedColumns = ['select', 'id', 'type', 'status', 'dueDate', 'owner', 'description'];
  dataSource: MatTableDataSource<QuoteLineItem>;
  quoteLines = null;
  selectedIsEmpty = true;
  selectedQuoteLineItems: number[] = [];
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private quoteService: QuoteService,
    private timeLineService: TimeLineService,
  ) {
  }

  ngOnInit() {
    // this.quoteService.getQuote(this.quoteId)
    //   .pipe(
    //     map((data) => {
    //       console.log(data.body)
    //       this.quote = data.body;
    //       this.quote.quoteLine = this.quote.quoteLine.filter(val => {
    //         return val.lineType === 'QuoteLine';
    //       });
    //       return this.quote;
    //     })
    //   )
    //   .subscribe(qt => {
    //     this.optyId = this.quote.optyId;
    //     this.quoteLines = this.quote.quoteLine;
    //     this.dataSource = new MatTableDataSource(this.quoteLines);
    //   });
    // )
    this.dataSource = new MatTableDataSource(this.quoteLinesInput.filter(val => val.lineType === 'QuoteLine'));
  }

  isAllSelected() {
    // console.log(this.selection.selected);
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.quoteLines) {
      this.isAllSelected()
        ? this.selection.clear()
        : this.dataSource.data.forEach(row => this.selection.select(row));
      this.selectedIsEmpty = this.selection.selected.length === 0 ? true : false;
    }
  }

  cbChanged($event, row, masterToggle) {
    if (this.quoteLines) {
      if (masterToggle) {
        this.masterToggle();
      }
      const checked = $event ? this.selection.toggle(row) : null;
      this.selectedIsEmpty = this.selection.selected.length === 0 ? true : false;
      return checked;
    }
  }

  checkboxLabel(row?: QuoteLineItem): string {
    if (this.quoteLines) {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
    }

  }

  openScheduler() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minHeight = '50%';
    dialogConfig.maxHeight = '640px';
    const ids = this.selection.selected.map(item => {
      return item.id;
    });
    const schedulerArguments = new SchedulerArguments();
    schedulerArguments.quoteId = this.quoteId;
    schedulerArguments.quoteLineItems = ids;
    schedulerArguments.optyId = this.optyId;
    dialogConfig.data = schedulerArguments;
    this.dialog.open(SchedulerComponent, dialogConfig);
  }

  createQuoteLine() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      quoteId: this.quoteId,
      optyId: this.optyId
    };
    const dialogRef = this.dialog.open(CreateQuoteLineModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.quoteLineCreated.emit();
      // this.redirectTo(`/opportunity/${this.quoteId}/quotes`);
    });
  }

  estimate_onClick() {
    // this.activatedRoute.params.subscribe(data => {
    //   this.router.navigate([`/opportunity/${data.optyId}/estimate`], { state: { quote: this.quote } });
    // });
    this.createEstimate();
  }

  createEstimate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minHeight = '90%';
    dialogConfig.data = {
      quoteLine: this.selection
    };
    const dialogRef = this.dialog.open(CreateEstimateComponent, dialogConfig).afterClosed().subscribe((resp) => {
      this.timeLineService.createTimeLine('New Estimate Created', this.optyId).subscribe(data => {
      });
    });
  }

  redirectTo(uri: string) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri], { skipLocationChange: true }));
  }
}

