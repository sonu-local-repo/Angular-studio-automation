import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DeptTaskListComponent} from "./dept-task-list/dept-task-list.component";
import {EmpTaskListComponent} from "./emp-task-list/emp-task-list.component";
import {TaskOrderDetailsComponent} from "./task-order-details/task-order-details.component";

const routes: Routes = [
  { path: '', component: DeptTaskListComponent, data:{breadcrumb: 'All Tasks'}},
  { path: 'mytask', component: EmpTaskListComponent ,data: {  breadcrumb: 'MyTask'}},
  { path: ':orderId', component: TaskOrderDetailsComponent, data: {  breadcrumb: ':orderId'} }

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
