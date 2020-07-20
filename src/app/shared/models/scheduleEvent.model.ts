
import { CalendarEvent } from 'angular-calendar';

export class ScheduleEvent implements CalendarEvent {
    id: number;
    start: Date;
    end: Date;
    title: string;
    color?: import('calendar-utils').EventColor;
    actions?: import('calendar-utils').EventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: { beforeStart?: boolean; afterEnd?: boolean; };
    draggable?: boolean;
    meta?: any;
    assignedId: number;
    description: string;
    timeZone?: string;
    quoteId: number;
    accountId: number;
    quoteLineItemId: number;
    optyId: number;
    employee: string;
}
