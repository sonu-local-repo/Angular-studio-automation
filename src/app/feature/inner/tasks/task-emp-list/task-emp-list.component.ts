import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../employee/models/employee.model';
import { TaskService } from '../task.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
// import { TaskUpdateModel } from "../model/task-update.model";

@Component({
  selector: 'app-task-emp-list',
  templateUrl: './task-emp-list.component.html',
  styleUrls: ['./task-emp-list.component.scss']
})
export class TaskEmpListComponent implements OnInit, AfterViewInit {

  employeeDetails: Employee;
  displayedColumns: string[] = ['firstName', 'username', 'actions'];
  @ViewChild(MatPaginator, { static: true }) matPaginator: MatPaginator;
  constructor(
    private dialogRef: MatDialogRef<TaskEmpListComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private taskService: TaskService) {

  }

  ngOnInit() {
    this.employeeDetails = this.data;

    // console.log(this.employeeDetails)

  }
  ngAfterViewInit(): void {
    // this.taskService.getTaskDepartmentEmployees(this.data).subscribe(data =>console.log(data));
  }

  associateEmployee(employeeId: any) {
    this.dialogRef.close(employeeId);

  }
}
