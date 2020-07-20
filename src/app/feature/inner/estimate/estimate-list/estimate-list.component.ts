import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Estimate } from '@shared/models/estimate.model';
import { EstimateService } from '@core/services/entities/estimate.service';
import { EstimateLineItems } from '@shared/models/estimateLine.model';
import { TimeLineService } from '@core/services/entities/timeline.service';
import { DataTransferService } from '@shared/services/dataTransferService.service';
import { Opportunity } from '@shared/models/opty.model';

@Component({
  selector: 'app-estimate-list',
  templateUrl: './estimate-list.component.html',
  styleUrls: ['./estimate-list.component.scss']
})
export class EstimateListComponent implements OnInit {

  public dataSource: MatTableDataSource<Estimate>;
  displayedColumns = ['id', 'createdDate', 'createdBy', 'rate', 'status', 'action'];
  @Input() estimate: Estimate[];
  selectedIsEmpty = true;
  quoteLines = null;
  panelOpenState = false;
  optyId = 0
  constructor(
    private estimateService: EstimateService,
    private timeLineService: TimeLineService,
    private dataService: DataTransferService) {

  }

  ngOnInit() {

    if (this.estimate && this.estimate.length > 0) {
      this.dataSource = new MatTableDataSource(this.estimate);
    } else {
      this.dataSource = new MatTableDataSource();
    }

  }

  approveEstimate(estimateId: number) {
    console.log('Estimate Id' + estimateId.toString());
    this.estimateService.approveEstimate(estimateId).subscribe(resp => {
      this.dataService.getData.subscribe((data) => {
        this.optyId = data.opty.id;
        this.timeLineService.createTimeLine('Estimate Approved', this.optyId).subscribe(r => console.log('Timeline response' + r.body))

      });
      console.log('Approve response' + resp.statusCode);
    });
  }

}
