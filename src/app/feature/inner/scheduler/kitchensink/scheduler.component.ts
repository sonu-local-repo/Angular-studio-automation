import {
  Component,
  ViewChild,
  TemplateRef,
  ChangeDetectorRef,
  Injectable,
  ViewEncapsulation,
  OnInit,
  Input,
  Inject,
  Optional,
  AfterContentChecked,
} from '@angular/core';
import { isSameDay, isSameMonth, addHours, endOfWeek } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarEventTitleFormatter,
} from 'angular-calendar';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { CreateScheduleDialogComponent } from '../create-schedule-dialog/create-schedule-dialog.component';
import { WeekViewHourSegment } from 'calendar-utils';
import { SchedulerService } from '@core/services/entities/scheduler.service';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ScheduleEvent } from '@shared/models/scheduleEvent.model';
import { SchedulerArguments } from '@shared/models/scheduler.argument.model';
import { EmployeeService } from '@core/services/entities/employee.service';
import { Employee } from '../../employee/models/employee.model';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  weekTooltip(event: CalendarEvent, title: string) {
    if (!event.meta.tmpEvent) {
      return super.weekTooltip(event, title);
    }
  }

  dayTooltip(event: CalendarEvent, title: string) {
    if (!event.meta.tmpEvent) {
      return super.dayTooltip(event, title);
    }
  }
}

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
  styles: [
    `
      .disable-hover {
        pointer-events: none;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class SchedulerComponent implements OnInit, AfterContentChecked {
  private modal: NgbModal;
  private quoteId: number;
  dragToCreateActive = false;
  weekStartsOn: 0 = 0;
  private dragToSelectEvent: CalendarEvent;
  allQuotes: any;
  quoteLineIds: any;
  filterEmployees = [];
  employeeList: any[] = [];
  calenderEventsList: ScheduleEvent[] = [];
  eventsCache: ScheduleEvent[] = [];
  constructor(
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private schedulerService: SchedulerService,
    private employeeService: EmployeeService,
    @Optional() @Inject(MAT_DIALOG_DATA) private inputArguments: SchedulerArguments
  ) {
    if (inputArguments) {
      this.quoteId = inputArguments ? inputArguments.quoteId : null;
      this.allQuotes = inputArguments ? inputArguments.allSelected : null;
      this.quoteLineIds = inputArguments ? inputArguments.quoteLineItems : null;
    } else {
      this.inputArguments = new SchedulerArguments();
    }

  }

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen = false;

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }


  ngOnInit(): void {
    this.employeeService.getAllEmployees(null).pipe(map((apiResponse) => {
      return apiResponse.content;
    })).subscribe(emps => {
      emps.forEach(emp => {
        this.employeeList.push({ id: emp.id, name: emp.firstName + ' ' + emp.lastName, color: this.getRandomColor(emp.id) });
      });
    });

    this.schedulerService
      .getAllSchedules()
      .pipe(
        map((httpBody: HttpResponse<ScheduleEvent[]>) => {
          return httpBody.body;
        })
      )
      .subscribe(calenderEvents => {
        calenderEvents = calenderEvents.sort((a: any, b: any) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        calenderEvents.map(item => {
          item.start = new Date(item.start);
          item.end = new Date(item.end);
          item.meta = {
            tmpEvent: true,
          };
          item.resizable = {
            beforeStart: false, // this allows you to configure the sides the event is resizable from
            afterEnd: true,
          };
        });
        this.eventsCache = calenderEvents;
        this.calenderEventsList = calenderEvents;
        this.events = calenderEvents;
      });
  }

  getColor(empId: number) {
    const empColor = this.employeeList.filter(s => s.id === empId);
    if (empColor.length > 0) {
      return empColor[0].color;
    } else {
      return 'hsl(red, 100%, 75%)';
    }
  }

  getRandomColor(empId: number) {
    // const color = Math.floor(0x1000000 * Math.random()).toString(16);
    // return '#' + ('000000' + color).slice(-6);
    const color = 'hsl(' + Math.random() * empId * 100 + ', 100%, 75%)';
    return color;
  }

  onEmployeeChange(item) {
    console.log('events cache', this.eventsCache);
    console.log('e', this.calenderEventsList);
    if (this.filterEmployees.indexOf(item.id) > -1) {
      this.filterEmployees = this.filterEmployees.filter(s => s !== item.id);
      if (this.filterEmployees.length !== 0) {
        this.calenderEventsList = this.eventsCache.filter(e => {
          return this.filterEmployees.indexOf(e.assignedId) >= 0;
        });
      } else {
        this.calenderEventsList = this.eventsCache;
      }
      this.events = this.calenderEventsList;
    } else {
      this.filterEmployees.push(item.id);
      this.calenderEventsList = this.eventsCache.filter(e => {
        return this.filterEmployees.indexOf(e.assignedId) >= 0;
      });
      console.log('filter output', this.calenderEventsList);
      this.events = this.calenderEventsList;
    }
    console.log(this.filterEmployees);
  }

  startDragToCreate(
    segment: WeekViewHourSegment,
    mouseDownEvent: MouseEvent,
    segmentElement: HTMLElement
  ) {
    this.dragToSelectEvent = {
      id: this.events.length,
      title: 'New event',
      start: segment.date,
      end: addHours(segment.date, 1),
      meta: {
        tmpEvent: true,
      },
      resizable: {
        beforeStart: false, // this allows you to configure the sides the event is resizable from
        afterEnd: true,
      },
    };

    const segmentPosition = segmentElement.getBoundingClientRect();
    this.dragToCreateActive = true;
    const endOfView = endOfWeek(this.viewDate, {
      weekStartsOn: this.weekStartsOn,
    });
    if (this.dragToCreateActive) {
      this.popupCreateEventsDialog(this.dragToSelectEvent);
    }
  }

  refreshEvents() {
    this.events = [...this.events];
    this.cdr.detectChanges();
  }

  floorToNearest(amount: number, precision: number) {
    return Math.floor(amount / precision) * precision;
  }

  ceilToNearest(amount: number, precision: number) {
    return Math.ceil(amount / precision) * precision;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
    // this.view = CalendarView.Week;
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  popupCreateEventsDialog(calenderEvent: CalendarEvent) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '480px';
    dialogConfig.autoFocus = true;
    // dialogConfig.disableClose = false;
    this.inputArguments.event = calenderEvent;
    dialogConfig.data = this.inputArguments;
    const dialogref = this.dialog.open(CreateScheduleDialogComponent, dialogConfig);
    dialogref.afterClosed().subscribe(scheduleEvent => {
      if (!scheduleEvent) {
        return;
      }
      calenderEvent.start = scheduleEvent.start;
      calenderEvent.end = scheduleEvent.end;
      calenderEvent.title = scheduleEvent.title;
      this.events = [...this.events, this.dragToSelectEvent];
    });
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    this.dragToSelectEvent.start = newStart;
    this.dragToSelectEvent.end = newEnd;
    this.refresh.next();
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }

  newEvent() {
    const schedulerEvent = {
      title: 'New event',
      start: new Date(),
      end: addHours(new Date(), 1),
      meta: {
        tmpEvent: true,
      },
      resizable: {
        beforeStart: false, // this allows you to configure the sides the event is resizable from
        afterEnd: true,
      }
    };
    this.popupCreateEventsDialog(schedulerEvent);
  }
}
