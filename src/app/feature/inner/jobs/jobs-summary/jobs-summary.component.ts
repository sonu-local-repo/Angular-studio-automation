import { Component, OnInit, Input } from '@angular/core';
import { JobsService } from '@core/services/entities/jobs.service';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { Jobs } from '@shared/models/jobs.model';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JobLineItem } from '@shared/models/joblineitem.model';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { SchedulerArguments } from '@shared/models/scheduler.argument.model';
import { SchedulerComponent } from '../../scheduler/kitchensink/scheduler.component';
import { CreateEstimateComponent } from '../../estimate/create-estimate/create-estimate.component';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
@Component({
  selector: 'app-jobs-summary',
  templateUrl: './jobs-summary.component.html',
  styleUrls: ['./jobs-summary.component.scss'],
})
export class JobsSummaryComponent implements OnInit {
  public dataSource: MatTableDataSource<JobLineItem>;
  private jobLineItems: JobLineItem[];
  displayedColumns = ['select', 'id', 'type', 'status', 'dueDate', 'owner'];
  @Input() jobsObs: Jobs[];
  selectedIsEmpty = true;
  selection = new SelectionModel<JobLineItem>(true, []);
  panelOpenState = false;
  constructor(
    private jobsService: JobsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) {

  }

  ngOnInit() {
    if (this.jobsObs.length > 0 && this.jobsObs[0].jobLine.length > 0) {
      this.dataSource = new MatTableDataSource(this.jobsObs[0].jobLine);
    } else {
      this.dataSource = new MatTableDataSource();
    }

  }

  isAllSelected() {
    // console.log(this.selection.selected);
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  cbChanged($event, row, masterToggle) {
    if (this.jobsObs) {
      const checked = $event ? this.selection.toggle(row) : null;
      this.selectedIsEmpty = this.selection.selected.length === 0 ? true : false;
      return checked;
    }
  }

  checkboxLabel(row?: JobLineItem): string {
    if (this.jobsObs) {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
    }

  }

  gotoDetails(jobId: number) {
    this.activatedRoute.parent.paramMap.subscribe(d => {
      this.router.navigate([`/opportunity/${d.get('optyId')}/jobs/${jobId}`], { skipLocationChange: true });
    });
    // console.log(this.router)
    // console.log(this.activatedRoute)
    // this.activatedRoute.paramMap.subscribe(d => {
    //   console.log(d)
    //   const optyId = d.get('optyId')
    //   this.router.navigate([`/opportunity/${optyId}/jobs/${jobId}`], { skipLocationChange: true });
    // });
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
    // schedulerArguments.quoteId = this.jobsObs.id;
    // schedulerArguments.quoteLineItems = ids;
    // schedulerArguments.optyId = this.optyId;
    dialogConfig.data = schedulerArguments;
    this.dialog.open(SchedulerComponent, dialogConfig);
  }


}
