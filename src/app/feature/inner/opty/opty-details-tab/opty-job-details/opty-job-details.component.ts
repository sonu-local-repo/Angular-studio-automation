import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { SchedulerArguments } from '@shared/models/scheduler.argument.model';
import { SchedulerComponent } from 'app/feature/inner/scheduler/kitchensink/scheduler.component';
import { Router, ActivatedRoute } from '@angular/router';
import { JobsService } from '@core/services/entities/jobs.service';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-opty-job-details',
  templateUrl: './opty-job-details.component.html',
  styleUrls: ['./opty-job-details.component.scss']
})
export class OptyJobDetailsComponent implements OnInit {
  private jobId;
  formGroup: FormGroup;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private jobService: JobsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      createdEmployee: [''],
      createdAt: [''],
      description: '',
      status: '',
      type: '',
      dueDate: '',
      updatedAt: ''
    });
    this.activatedRoute.params.subscribe(data => {
      this.jobId = data.jobId;
      this.loadJobDetails(this.jobId);
    });
  }

  backToJobs() {
    this.activatedRoute.parent.paramMap.subscribe(d => {
      this.router.navigate([`/opportunity/${d.get('optyId')}/jobs/`], { skipLocationChange: true });
    });
  }

  loadJobDetails(jobId: number) {
    this.jobService.getJobDetails(jobId).pipe(map((resp) => {
      return resp.body;
    })).subscribe(d => {
      console.log(d)
      this.formGroup.patchValue(d);
      this.formGroup.patchValue({
        createdEmployee: d.createdEmployee.firstName + ' ' + d.createdEmployee.lastName,
        createdAt: formatDate(d.createdAt, 'yyyy-MM-dd', 'en-US'),
        updatedAt: formatDate(d.updatedAt, 'yyyy-MM-dd', 'en-US')
      });
      console.log(this.formGroup);
    });

  }

  openScheduler() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minHeight = '50%';
    dialogConfig.maxHeight = '640px';
    const schedulerArguments = new SchedulerArguments();
    // schedulerArguments.quoteId = this.jobsObs.id;
    // schedulerArguments.quoteLineItems = ids;
    // schedulerArguments.optyId = this.optyId;
    dialogConfig.data = schedulerArguments;
    this.dialog.open(SchedulerComponent, dialogConfig);
  }

}
