import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {EmployeeDepartment} from "../employee/models/employee-department.model";
import {Observable, of} from "rxjs";
import {EmployeePosition} from "../employee/models/employee-position.model";
import {PositionAPI} from "@shared/api-end-points/position-api-endpoint";
import {tap} from "rxjs/operators";
import {DepartmentApi} from "@shared/api-end-points/department-api-endpoint";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private departments: EmployeeDepartment[];

  constructor( private http: HttpClient  ) { }

  /* Public Methods */
  getAllDepartments(): Observable<EmployeeDepartment[]> {
    return this.departments
      ? of(this.departments)
      : this.http.get<EmployeeDepartment[]>(DepartmentApi.getAllDepartmentsUrl()).pipe(
        tap((data) => { this.departments = data; })
      );
  }
}
