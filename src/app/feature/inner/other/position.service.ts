import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PositionAPI } from '@shared/api-end-points/position-api-endpoint';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EmployeePosition } from '../employee/models/employee-position.model';

@Injectable({
    providedIn: 'root'
})
export class PositionService {

    private positions: EmployeePosition[];

    constructor(
        private http: HttpClient
    ) { }

    /* Public Methods */
    getAllPositions(): Observable<EmployeePosition[]> {
        return this.positions
            ? of(this.positions)
            : this.http.get<EmployeePosition[]>(PositionAPI.getAllPositionsUrl()).pipe(
                tap((data) => { this.positions = data; })
            );
    }
}
