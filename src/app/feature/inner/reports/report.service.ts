import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reportsAPI } from '@shared/api-end-points/reports-api-endpoints';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ReportService {
    constructor(
        private http: HttpClient,

    ) {

    }
    executeQuery(queryString: string): Observable<any[]> {
        return this.http.post<any[]>(reportsAPI.executeQueryrUrl(), { query: queryString });
    }
}

