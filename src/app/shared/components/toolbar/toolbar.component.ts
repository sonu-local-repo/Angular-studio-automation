import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { OrderFilterParams } from 'app/feature/inner/order/models/order-filter-params.model';
import { TaskService } from 'app/feature/inner/tasks/task.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  orderIds: [] = [];
  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.taskService.getTasksByDepartment().subscribe(data => {
      console.log(data);
    });

    // .pipe(
    //   map((data) => {
    //     console.log(data);
    //     data.content.map(item => {
    //       console.log(item.id);
    //     });
    //   })
    // );
  }

}
