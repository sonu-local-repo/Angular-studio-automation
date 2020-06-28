import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { ModalService } from '@shared/services/modal.service';
import { Order } from '../models/order';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { OrderWorkflowComponent } from '../order-workflow/order-workflow.component';
import {PermissionService} from "@core/services/permission.service";
import {ScreenName} from "@shared/enums/screen-name.enum";

@Component({
  selector: 'app-sub-order-list-table-view',
  templateUrl: './sub-order-list-table-view.component.html',
  styleUrls: ['./sub-order-list-table-view.component.scss']
})
export class SubOrderListTableViewComponent implements OnInit {

  subOrderList: Order[];
  displayedColumns: string[] = ['id', 'type', 'quantity', 'status', 'dueDate', 'priority', 'createdAt', 'actions'];

  @Input() parentOrderId: number;
  @Input() isEditMode: boolean;
  @Input() parentOrder: Order;
  screenName=ScreenName;

  constructor(
    private orderService: OrderService,
    private modalService: ModalService,
    private dialog: MatDialog,
    private router: Router,
    public permissionService: PermissionService,
  ) { }

  /* Lifecycle Hooks*/
  ngOnInit() {
    this.getSubOrderDetails();
  }

  /* Private Methods*/
  private getSubOrderDetails() {
    this.orderService.getRelatedOrders(this.parentOrderId).subscribe((orders) => {
      this.subOrderList = orders;
    });
  }

  /* Public Methods*/
  viewSubOrder(orderId: number) {
    window.open(`/orders/${orderId}`, '_blank');
  }

  editSubOrder(orderId: number) {
    window.open(`/orders/${orderId}/edit`, '_blank');
  }

  deleteSubOrder(orderId: number) {
    const confirm = { question: `Are you sure to delete the order#: ${orderId}`, yes: 'Delete', no: 'Cancel' };
    const dialogConfig = this.modalService.setDialogConfig(true, false, '780px', confirm);
    this.dialog.open(ConfirmModalComponent, dialogConfig)
      .afterClosed().subscribe(flag => {
        if (flag) {

        }
      });
  }

  addSubOrder() {
    // console.log()
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.width = '60%';
    matDialogConfig.autoFocus = true;
    matDialogConfig.disableClose = true;
    matDialogConfig.panelClass = 'my-dialog';
    // tslint:disable-next-line:object-literal-shorthand
    matDialogConfig.data = {
      orderId: this.parentOrder.id,
      customerId: this.parentOrder.customerId,
      childOrder: true,
      coupleName: this.parentOrder.value3,
      color: this.parentOrder.value4,
      source: 'SubOrderScreen'
    };
    const dialogRef = this.dialog.open(OrderWorkflowComponent, matDialogConfig);
    const subscription = dialogRef.afterClosed().subscribe(data => {
      if (data.createNewOrder) {
      //  this.addSubOrder(data.orderId, data.customerId, data.createNewOrder, data.coupleName, data.color);
        subscription.unsubscribe();
      }
    });
  }
}
