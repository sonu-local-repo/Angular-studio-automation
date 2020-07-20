import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Timeline } from '@shared/models/timeline.model';

@Injectable({
    providedIn: 'root'
})

export class TimeLineService {

    constructor(
        private apiService: ApiService
    ) {

    }
    createTimeLine(desc: string, parent: number) {
        return this.apiService.post('/timeline/create', { description: desc, parentId: parent });
    }

    getTimeLine(parendId: number): Observable<HttpResponse<Timeline>> {
        return this.apiService.get(`/timeline/parent/${parendId}/all`);
    }
}
