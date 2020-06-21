import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '@shared/components/layout/breadcrumb/breadcrumb.service';
import { ErrorService } from '@shared/services/error.service';
import { Order } from '../models/order';
import { OrderService } from '../order.service';
import { SubjectService } from '../subject-service';
import { MatTabGroup } from '@angular/material/tabs';
import html2canvas from 'html2canvas';

import * as jspdf from 'jspdf';
import { OrderAttachment } from '../models/order-attachment';
import { TaskService } from '../../tasks/task.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-order-profile',
  templateUrl: './order-profile.component.html',
  styleUrls: ['./order-profile.component.scss']
})
export class OrderProfileComponent implements OnInit {

  orderId: number;
  orderDetails: Order;
  subOrderList: Order[];
  pagesGroupedByType: any = [];
  enable = true;

  @ViewChild('tabViews', { static: false }) tabViews: MatTabGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private breadcrumbService: BreadcrumbService,
    private errorService: ErrorService,
    private subjectService: SubjectService,
    private taskService: TaskService

  ) { }

  /* Lifecycle Hooks */
  ngOnInit() {
    this.initVariables();
    this.getOrderDetails();
    this.subjectService.events$.subscribe(data => {
      this.tabViews.selectedIndex = 4;
    });
  }

  /* Private Methods */
  private initVariables() {
    this.orderId = parseInt(this.activatedRoute.snapshot.paramMap.get('orderId'), 0);
    this.breadcrumbService.updateDynamicList(':orderId', this.orderId.toString());
    if (isNaN(this.orderId)) {
      this.errorService.showSomeThingWentWrongMessage();
      return;
    }
  }

  private getOrderDetails() {
    if (this.orderId) {
      this.orderService.getOrder(this.orderId)
        .subscribe(
          (data) => {
            this.orderDetails = data;
            // console.log(this.orderDetails);
          },
          (error) => {
            this.errorService.showSomeThingWentWrongMessage();
          }
        );
    }
  }

  public processOrder(id: number) {
    this.enable = false;
    this.orderService.assignAndProcessOrder(id).subscribe(() => {
      // this.tabViews.selectedIndex = 5;
      this.subjectService.moveToTask();
      this.savePDF();
    });

  }

  savePDF() {
    const data = document.getElementById('pdftoExport');
    html2canvas(data)
      .then((canvas) => {
        const dt = formatDate(new Date(), 'Mdyyhmmss', 'en');
        const imgData = canvas.toDataURL('image/jpeg');
        const pdfDoc = new jspdf({
          orientation: 'potrait',
        });
        const imgProps = pdfDoc.getImageProperties(imgData);
        const pdfWidth = pdfDoc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdfDoc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        // tslint:disable-next-line:no-unused-expression
        pdfDoc.save(this.orderId + dt + '.pdf');
        const orderAttachment: OrderAttachment = {
          fileName: this.orderId + dt + '.pdf',
          fileContent: btoa(pdfDoc.output())
        };
        this.taskService.uploadFile(this.orderId, orderAttachment).subscribe(() => this.subjectService.moveToTask());
      });
  }
}
