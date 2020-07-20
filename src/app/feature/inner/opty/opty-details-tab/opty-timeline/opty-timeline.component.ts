import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { TimeLineService } from '@core/services/entities/timeline.service';
import { DataTransferService } from '@shared/services/dataTransferService.service';
import { Timeline } from '@shared/models/timeline.model';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-opty-timeline',
  templateUrl: './opty-timeline.component.html',
  styleUrls: ['./opty-timeline.component.scss']
})
export class OptyTimelineComponent implements OnInit, AfterViewInit {
  public timeLine: Timeline;
  private optyId;
  constructor(
    private timeLineService: TimeLineService,
    private dataTransferService: DataTransferService,
    private activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
    // this.dataTransferService.getData.subscribe(t => {
    //   console.log(t)
    //   this.getTimeLine();
    // }).unsubscribe();
  }

  ngAfterViewInit() {
    this.getTimeLine();
  }

  getTimeLine() {
    this.activatedRoute.params.subscribe(data => {
      this.optyId = data.optyId;
      this.timeLineService.getTimeLine(this.optyId).pipe(map((response) => {
        return response.body;
      })).subscribe(tl => {
        this.timeLine = tl;
      });
    }).unsubscribe();
  }
}
