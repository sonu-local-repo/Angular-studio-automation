import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
@Injectable({
    providedIn: 'root'
})
export class SchedulerService {
  constructor(private apiService: ApiService) {}

  getAllSchedules() {
      return this.apiService.get('/omt/scheduler/all');
  }
  getScheduleByAssignee() {}
  getScheduleByOpportunity(optyId: number) {
    return this.apiService.get(`/omt/scheduler/opty/${optyId}`);
  }
  getScheduleByQuote() {}
  createSchedule(body) {
      return this.apiService.post('/omt/scheduler/create', body);
  }
}
