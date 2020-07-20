import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PermissionService } from '@core/services/permission.service';
import { ScreenName } from '@shared/enums/screen-name.enum';
import { Order } from '../models/order';
import { OrderService } from '../order.service';
import { MatDialogConfig, MatDialog, MatTabGroup } from '@angular/material';
import { OrderWorkflowComponent } from '../order-workflow/order-workflow.component';
import { BehaviorSubject, Subscription } from 'rxjs';
import { switchMap, subscribeOn } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Attachment } from '../models/order-attachment';
import html2canvas, { Options } from 'html2canvas';

import * as jspdf from 'jspdf';
import { formatDate } from '@angular/common';
import { SubjectService } from '../subject-service';
import { TaskService } from '../../tasks/task.service';
@Component({
  selector: 'app-order-profile-summary',
  templateUrl: './order-profile-summary.component.html',
  styleUrls: ['./order-profile-summary.component.scss']
})
export class OrderProfileSummaryComponent implements OnInit {

  @Input() orderDetails: Order;
  screenName = ScreenName;
  mySubscription: any;
  @ViewChild('tabViews', { static: false }) tabViews: MatTabGroup;
  private readonly refreshToken$ = new BehaviorSubject(undefined);
  private eOrderId;
  enable = true;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public permissionService: PermissionService,
    public orderService: OrderService,
    private dialog: MatDialog,
    private http: HttpClient,
    private subjectService: SubjectService,
    private taskService: TaskService,
  ) { }

  /* Lifecycle hooks */
  ngOnInit() {
    this.eOrderId = parseInt(this.activatedRoute.snapshot.paramMap.get('orderId'), 0);
    const tasks$ = this.refreshToken$.pipe(
      switchMap(() => this.http.get(`/orders/${this.eOrderId}`)));
  }

  /* Public Methods */
  editOrderProfile() {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.width = '60%';
    matDialogConfig.autoFocus = true;
    matDialogConfig.disableClose = true;
    matDialogConfig.panelClass = 'my-dialog';
    // console.log(this.dialog);
    matDialogConfig.data = {
      orderId: this.eOrderId,
      customerId: this.orderDetails.customerId,
      orderObject: this.orderDetails
    };
    // console.log(matDialogConfig.data)
    const dialogRef = this.dialog.open(OrderWorkflowComponent, matDialogConfig);
    const subscription = dialogRef.afterClosed().subscribe(data => {
      this.refreshToken$.next(undefined);
    });
  }

  public processOrder(id: number) {
    this.enable = false;
    // this.tabViews.selectedIndex = 5;
    // this.subjectService.moveToTask();
    this.orderService.assignAndProcessOrder(id).subscribe(() => {
      // this.tabViews.selectedIndex = 5;
      this.subjectService.moveToTask();
      // this.subjectService.moveToTask();
      this.savePDF(true);

    });

  }

  savePDF(uploadAttachment: boolean) {
    const data = document.getElementById('pdftoExport');
    const opts: Partial<Options> = {
      logging: false,
      scale: 2
    };
    html2canvas(data, opts)
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
        pdfDoc.save(this.eOrderId + dt + '.pdf');
        const orderAttachment: Attachment = {
          fileName: this.eOrderId + dt + '.pdf',
          fileContent: btoa(pdfDoc.output())
        };
        if (uploadAttachment) {
          this.taskService.uploadFile(this.eOrderId, orderAttachment).subscribe(upRes => {
            console.log(upRes);
            this.subjectService.moveToTask();
          }
            , (error) => {
              console.log('unable to save the attachment to server');
            }
          );
        }
      });
  }
}
