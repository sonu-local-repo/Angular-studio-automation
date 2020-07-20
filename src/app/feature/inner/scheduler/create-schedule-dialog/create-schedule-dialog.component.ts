import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CalendarEvent } from 'angular-calendar';
import { DatePipe } from '@angular/common';
import { ScheduleEvent } from '@shared/models/scheduleEvent.model';
import { SchedulerArguments } from '@shared/models/scheduler.argument.model';
import { SchedulerService } from '@core/services/entities/scheduler.service';
import { EmployeeService } from '@core/services/entities/employee.service';
import { map } from 'rxjs/operators';
import { QuoteLineItemService } from '@core/services/entities/quoteLine.service';
import { QuoteLineItem } from '@shared/models/quotelineitem.model';
@Component({
  selector: 'app-create-schedule-dialog',
  templateUrl: './create-schedule-dialog.component.html',
  styleUrls: ['./create-schedule-dialog.component.scss'],
})
export class CreateScheduleDialogComponent implements OnInit {
  calendarEvent: CalendarEvent;
  eventForm: FormGroup;
  startTime = '';
  startDate: Date;
  endDate: Date;
  endTime = '';
  quoteId = 0;
  quoteLineIds: number[];
  empList = [];
  loadingEmp = true;
  constructor(
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateScheduleDialogComponent>,
    private schedulerService: SchedulerService,
    private employeeService: EmployeeService,
    private quoteLineService: QuoteLineItemService,
    @Optional() @Inject(MAT_DIALOG_DATA) private schedulerArguments: SchedulerArguments
  ) {
    // tslint:disable-next-line:no-string-literal
    this.calendarEvent = schedulerArguments.event;
    this.quoteId = schedulerArguments.quoteId;
    this.quoteLineIds = schedulerArguments.quoteLineItems;
    this.startDate = this.calendarEvent.start;
    this.endDate = this.calendarEvent.end;
    this.startTime = this.startDate.toTimeString();
    console.log(this.startTime);
    console.log(this.startDate.toTimeString());
    this.endTime = this.endDate.toTimeString();
  }

  ngOnInit() {
    this.employeeService.getAllEmployees(null).pipe(map((data) => {
      return data.content;
    })).subscribe(data => {
      console.log(data);
      const emps = [];
      Object.assign(emps
        , data);
      emps.forEach(element => {
        console.log(element);
        this.empList.push({ id: element.id, name: element.firstName + ' ' + element.lastName });
      });
      console.log(this.empList);
      this.loadingEmp = false;
      this.createEventForm();
    });
  }

  createEventForm() {
    this.eventForm = this.fb.group({
      startDate: [this.startDate, Validators.required],
      endDate: [this.endDate, Validators.required],
      startTime: [this.startTime, Validators.required],
      endTime: [this.endTime, Validators.required],
      timeZone: '',
      title: ['New Event', Validators.required],
      description: this.quoteId ? this.quoteId : '',
      assignee: ['', Validators.required],
    });
  }

  saveEvent() {
    let schedulerEvent = new ScheduleEvent();
    schedulerEvent = Object.assign(schedulerEvent, this.eventForm.value);
    // console.log(schedulerEvent);
    // schedulerEvent.startDate = this.datePipe.transform(schedulerEvent.startDate, 'yyyy/M/dd');
    // schedulerEvent.endDate = this.datePipe.transform(schedulerEvent.endDate, 'yyyy/M/dd');
    schedulerEvent.start = new Date(
      this.startDate.getFullYear(),
      this.startDate.getMonth(),
      this.startDate.getDate(),
      this.eventForm
        .get('startTime')
        .value.split(':')[0]
        .trim(),
      this.eventForm
        .get('startTime')
        .value.split(':')[1]
        .trim()
    );
    schedulerEvent.end = new Date(
      this.endDate.getFullYear(),
      this.endDate.getMonth(),
      this.endDate.getDate(),
      this.eventForm
        .get('endTime')
        .value.split(':')[0]
        .trim(),
      this.eventForm
        .get('endTime')
        .value.split(':')[1]
        .trim()
    );
    schedulerEvent.title = this.eventForm.get('title').value;
    schedulerEvent.description = this.eventForm.get('description').value;
    schedulerEvent.assignedId = this.eventForm.get('assignee').value;
    schedulerEvent.quoteId = this.quoteId;
    schedulerEvent.optyId = this.schedulerArguments.optyId;
    let transactionSucess = false;
    this.schedulerService.createSchedule(schedulerEvent).subscribe((result: ScheduleEvent) => {
      this.quoteLineIds.forEach((qli) => {
        this.quoteLineService.updateQuoteLineItem(qli, { id: qli, owner: this.eventForm.get('assignee').value }).subscribe(() => {
        }, (error) => {
          console.log(error);
          transactionSucess = false;
        });
      });
      transactionSucess = true;
      this.dialogRef.close(schedulerEvent);
    }, (error) => {
      console.log(error);
    });
  }
}
