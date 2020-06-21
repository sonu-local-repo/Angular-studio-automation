import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../../employee/models/employee.model';
import { TaskService } from '../task.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskNotesComponent } from '../task-notes/task-notes.component';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Task } from '../model/task';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-emp-task-list',
  templateUrl: './emp-task-list.component.html',
  styleUrls: ['./emp-task-list.component.scss']
})
export class EmpTaskListComponent implements OnInit, AfterViewInit {

  taskList: MatTableDataSource<Task> = new MatTableDataSource([]);
  employees: Employee[];
  resultlength = 0;
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
    'assign'];
  @Input() orderId: number;
  empTask$: Observable<Task[]>;
  @ViewChild(MatPaginator, { static: true }) matPaginator: MatPaginator;
  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }
  ngOnInit() {

  }

  ngAfterViewInit() {
    this.getEmployeeTasks();
  }

  private getEmployeeTasks() {
    this.taskService.getTasksByEmployee().pipe(
      map(data => data.filter(d => d.status === 'Work In Progress'))
    ).subscribe(data => {
      // console.log(data);
      this.taskList.data = data;
      this.taskList.paginator = this.matPaginator;
      this.resultlength = data.length;
    });
  }

  competeTask(id: number, assignedToDeptId: number) {
    const taskUpdate = {
      id: id,
      assignedTo: 0,
      status: 'Completed',
      notes: ''
    };
    this.dialog.open(TaskNotesComponent, {
      width: '50%',
      data: []
    }).afterClosed().subscribe(data => {
      if (data !== undefined) {
        taskUpdate.notes = data;
        this.taskService.completeTask(taskUpdate).subscribe(data => {
          this.getEmployeeTasks();
        });
      }

    }

    );
  }

  navigateToDetails(orderId: number) {
    this.router.navigateByUrl(`tasks/${orderId}`);

  }
}
