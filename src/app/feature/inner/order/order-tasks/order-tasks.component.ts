import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from '../order.service';
import { Task } from '../../tasks/model/task';
import { ActivatedRoute } from "@angular/router";
import { SubjectService } from "../subject-service";


@Component({
  selector: 'app-order-tasks',
  templateUrl: './order-tasks.component.html',
  styleUrls: ['./order-tasks.component.scss']
})
export class OrderTasksComponent implements OnInit {

  taskList: MatTableDataSource<Task> = new MatTableDataSource([]);
  displayedColumns: string[] = [
    'order', 'status', 'assignedToDept', 'assignedToDeptTime', 'assignedToEmployee', 'assignedToEmployeeTime', 'assignedBy',
    'completedTime', 'notes'  ];
  @Input() orderId: number;

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute, private subject: SubjectService) { }

  ngOnInit() {
    this.getOrderId();
    this.fetchOrderTasks();
    this.refresh();


  }

  fetchOrderTasks() {

    this.orderService.getAllOrderTasks(this.orderId)
      .subscribe(data => {
        this.taskList.data = data;

      });

  }
  refresh() {
      this.fetchOrderTasks();
  }
  getOrderId() {
    if (this.orderId === undefined) {

      this.orderId = +this.activatedRoute.snapshot.paramMap.get('orderId');
    }
  }
}
