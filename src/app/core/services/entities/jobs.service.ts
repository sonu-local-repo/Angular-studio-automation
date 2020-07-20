import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})

export class JobsService {
  constructor(private apiService: ApiService) { }
  getJobs(quoteId: number) {
    return this.apiService.get(`/omt/quote/'${quoteId}`);
  }
  getJobDetails(jobId: number) {
    return this.apiService.get(`/omt/quoteLine/${jobId}`);
  }
}
