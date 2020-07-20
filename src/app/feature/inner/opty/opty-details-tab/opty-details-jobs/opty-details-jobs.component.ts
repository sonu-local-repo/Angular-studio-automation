import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '@shared/services/dataTransferService.service';
import { of, Observable } from 'rxjs';
import { Opportunity } from '@shared/models/opty.model';
import { Jobs } from '@shared/models/jobs.model';
import { JobLineItem } from '@shared/models/joblineitem.model';
@Component({
  selector: 'app-opty-details-jobs',
  templateUrl: './opty-details-jobs.component.html',
  styleUrls: ['./opty-details-jobs.component.scss'],

  // tslint:disable-next-line:no-host-metadata-property
  host: { style: 'width: 100%' }
})
export class OptyDetailsJobsComponent implements OnInit {
  private opty: Opportunity;
  public jobs: Jobs[] = null;
  constructor(
    private dataTransferService: DataTransferService
  ) {
    this.dataTransferService.getData.subscribe(data => {
      this.opty = data.opty;
      if (this.opty) {
        if (this.opty.quotes && this.opty.quotes.length > 0) {
          const jobsArray: Jobs[] = [];
          const job = new Jobs();
          job.accountId = this.opty.quotes[0].accountId;
          job.jobLine = [];
          this.opty.quotes[0].quoteLine.filter(key => {
            return key.lineType === 'Job'
          }).forEach(key => {
            job.jobLine.push(key);
          });
          jobsArray.push(job)
          this.jobs = jobsArray;
        }

      }
    });
  }

  ngOnInit() {
  }


}
