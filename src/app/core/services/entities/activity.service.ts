import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Activity } from '@shared/models/activity.model';

@Injectable({
    providedIn: 'root'
})

export class ActivityService {
    constructor(
        private apiService: ApiService
    ) {

    }
    getAllActivities() {
        return this.apiService.get(`/omt/activity/all`);
    }

    createActivity(body: Activity) {
        return this.apiService.post(`/omt/activity`, body);
    }
}
