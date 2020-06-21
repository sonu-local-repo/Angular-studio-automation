import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeAPI } from '@shared/api-end-points/employee-api-endpoint';
import { ScreenAPI } from '@shared/api-end-points/screen-api-endpoint';
import { ApiResponse } from '@shared/models/api-response.model';
import { EmployeeFilterParams } from 'app/feature/inner/employee/models/employee-filter-params.model';
import { Employee } from 'app/feature/inner/employee/models/employee.model';
import { Observable } from 'rxjs';
import { EmployeeScreenViewGroup } from '../settings/models/employee-screen-view-group.model';
import { EmployeeScreenView } from '../settings/models/employee-screen-view.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
  ) { }

  /* Public Methods */
  getAllEmployees(employeeFilterParams: EmployeeFilterParams): Observable<ApiResponse<Employee[]>> {
    return this.http.get<ApiResponse<Employee[]>>(EmployeeAPI.getAllEmployeesUrl(employeeFilterParams));
  }

  getEmployee(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(EmployeeAPI.getEmployeeUrl(employeeId));
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(EmployeeAPI.createEmployeeUrl(), employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(EmployeeAPI.updateEmployeeUrl(employee.id), employee);
  }

  getEmployeeScreens(employeeId: number): Observable<EmployeeScreenViewGroup[]> {
    return this.http.get<EmployeeScreenViewGroup[]>(EmployeeAPI.getEmployeeScreens(employeeId));
  }

  createEmployeeView(view: EmployeeScreenView) {
    return this.http.post<EmployeeScreenViewGroup[]>(ScreenAPI.associateEmployeeViewUrl(), view);
  }

  updateEmployeeView(view: EmployeeScreenView) {
    return this.http.put<EmployeeScreenViewGroup[]>(ScreenAPI.updateEmployeeViewUrl(view.id), view);
  }
}
