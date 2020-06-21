import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { TaskService } from '../task.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskEmpListComponent } from '../task-emp-list/task-emp-list.component';
import { Employee } from '../../employee/models/employee.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Task } from '../model/task';
import { MatPaginator } from '@angular/material';


@Component({
  selector: 'app-dept-task-list',
  templateUrl: './dept-task-list.component.html',
  styleUrls: ['./dept-task-list.component.scss']
})
export class DeptTaskListComponent implements OnInit, AfterViewInit {

  taskList: MatTableDataSource<Task> = new MatTableDataSource([]);
  employees: Employee[];
  resultLength = 0;
  displayedColumns: string[] = [
    'order',
    'orderId',
    'status',
    'assignedToDept',
    'assignedToDeptTime',
    'assignedToEmployee',
    'assignedToEmployeeTime',
    'assignedBy',
    'completedTime',
    'assign'
  ];
  @Input() orderId: number;

  @ViewChild(MatPaginator, { static: true }) matPaginator: MatPaginator;
  constructor(private taskService: TaskService, private dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {

  }
  ngAfterViewInit() {
    this.getDepartmentTasks();
  }

  private getDepartmentTasks() {

    this.taskService.getTasksByDepartment().pipe(
      map(data => data.filter(d => d.status === 'In Progress'))
    ).subscribe(data => {
      this.taskList = new MatTableDataSource(data);
      this.resultLength = data.length;
      this.taskList.paginator = this.matPaginator;
    });

  }

  assignToEmployee(id: number, assignedDepartment: number) {
    this.taskService.getTaskDepartmentEmployees(assignedDepartment).subscribe(data => {
      this.employees = data['employees'];
      const dialogRef = this.dialog.open(TaskEmpListComponent, {
        width: '50%',
        data: this.employees || []
      }).afterClosed().subscribe(employeeId => {
        if (employeeId !== undefined) {
          const taskUpdate = {
            id: id,
            assignedTo: employeeId,
            status: 'Work In Progress',
            notes: ''
          };
          this.taskService.assignTaskToEmployee(taskUpdate).subscribe(data => this.getDepartmentTasks());
        }


      });

    })

  }

  navigateToDetails(orderId: number) {
    this.router.navigateByUrl(`tasks/${orderId}`);
  }
}
