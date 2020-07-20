import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Estimate } from '@shared/models/estimate.model';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class EstimateService {

    constructor(
        private apiService: ApiService
    ) {
    }

    getEstimate(optyId: number) {
        return this.apiService.get(`/estimate/opty/${optyId}/all`);
    }

    createEstimate(optyId: number, estimateObject: Estimate): Observable<HttpResponse<Estimate>> {
        return this.apiService.post(`/estimate/opty/${optyId}/create`, estimateObject);
    }

    approveEstimate(id: number) {
        return this.apiService.put(`/estimate/status/${id}`);
    }
}
