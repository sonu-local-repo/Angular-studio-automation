import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskAPI } from '@shared/api-end-points/task-api-endpoint';
import { TaskDeptModel } from './model/task-dept.model';
import { TaskUpdateModel } from './model/task-update.model';
import { OrderAttachment } from '../order/models/order-attachment';
import { Task } from './model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) {
  }
  getTasksByDepartment(): Observable<Task[]> {
    return this.http.get<Task[]>(TaskAPI.getTaskByDepartmentUrl());
  }
  getTasksByEmployee(): Observable<Task[]> {
    return this.http.get<Task[]>(TaskAPI.getTaskByEmployeeUrl());
  }
  getTaskDepartmentEmployees(deptId: number): Observable<TaskDeptModel[]> {
    return this.http.get<TaskDeptModel[]>(TaskAPI.getTaskEmployeeUrl(deptId));
  }
  assignTaskToEmployee(taskDetails: TaskUpdateModel): Observable<Task> {
    return this.http.put<Task>(TaskAPI.assignTaskToEmployee(taskDetails.id), taskDetails);
  }
  completeTask(taskDetails: TaskUpdateModel): Observable<Task> {
    return this.http.put<Task>(TaskAPI.completeTaskUrl(taskDetails.id), taskDetails);
  }
  uploadFile(id: number, attachment: OrderAttachment): Observable<any> {
    return this.http.post<any>(TaskAPI.uploadFile(id), attachment);
  }
}
