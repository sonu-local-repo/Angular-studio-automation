import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { DeptTaskListComponent } from './dept-task-list/dept-task-list.component';
import { EmpTaskListComponent } from './emp-task-list/emp-task-list.component';
import {SharedModule} from "@shared/shared.module";
import { TaskEmpListComponent } from './task-emp-list/task-emp-list.component';
import { TaskNotesComponent } from './task-notes/task-notes.component';
import { TaskOrderDetailsComponent } from './task-order-details/task-order-details.component';
import {OrderModule} from "../order/order.module";



@NgModule({
  declarations: [ DeptTaskListComponent, EmpTaskListComponent, TaskEmpListComponent, TaskNotesComponent, TaskOrderDetailsComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
    OrderModule
  ],
  entryComponents:[TaskEmpListComponent, TaskNotesComponent]
})
export class TasksModule { }
