import { Component, OnInit, OnDestroy } from '@angular/core';
import { SchedulerService } from '@core/services/entities/scheduler.service';
import { DataTransferService } from '@shared/services/dataTransferService.service';
import { ScheduleEvent } from '@shared/models/scheduleEvent.model';
import { MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-opty-details-schedule',
  templateUrl: './opty-details-schedule.component.html',
  styleUrls: ['./opty-details-schedule.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: { style: 'width:100%' }
})
export class OptyDetailsScheduleComponent implements OnInit, OnDestroy {
  public dataSource: MatTableDataSource<ScheduleEvent>;
  public displayedColumns = ['title', 'description', 'start', 'end', 'assignedto'];
  private routerSub: Subscription;
  private schedulerSub: Subscription;
  constructor(
    private schedulerService: SchedulerService,
    private dataTansferService: DataTransferService,
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.routerSub = this.activateRoute.paramMap.subscribe(data => {
      const optyId = parseInt(data.get('optyId'), 10);
      this.schedulerSub = this.schedulerService.getScheduleByOpportunity(optyId).pipe(map((resp) => {
        console.log(resp.body);
        return resp.body;
      })).subscribe(events => {
        this.dataSource = new MatTableDataSource(events);
      });
    });
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
    this.schedulerSub.unsubscribe();
  }

}
