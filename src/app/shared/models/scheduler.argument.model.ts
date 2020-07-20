import { CalendarEvent } from 'angular-calendar';

export class SchedulerArguments {
  quoteId: number;
  allSelected: boolean;
  quoteLineItems: number[];
  event: CalendarEvent;
  optyId: number;
  jobId: number;
  title: string;
  description: string;
}
