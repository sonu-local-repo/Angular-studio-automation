import { Component, OnInit } from '@angular/core';
import { Order } from "../../order/models/order";
import { OrderService } from "../../order/order.service";
import { ErrorService } from "@shared/services/error.service";
import { ActivatedRoute } from "@angular/router";
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpClient, HttpParams } from "@angular/common/http";
import { TaskService } from "../task.service";
import { OrderAttachment } from "../../order/models/order-attachment";

@Component({
  selector: 'app-task-order-details',
  templateUrl: './task-order-details.component.html',
  styleUrls: ['./task-order-details.component.scss']
})
export class TaskOrderDetailsComponent implements OnInit {
  orderId: number;
  orderDetails: Order;
  subOrderList: Order[];
  pagesGroupedByType: any = [];
  constructor(private errorService: ErrorService, private orderService: OrderService, private activatedRoute: ActivatedRoute,
    private taskService: TaskService, private http: HttpClient) { }

  ngOnInit() {

    this.orderId = parseInt(this.activatedRoute.snapshot.paramMap.get('orderId'));
    // console.log(this.orderId);
    this.getOrderDetails();
  }
  private getOrderDetails() {
    // this.orderId = 5024;
    if (this.orderId) {
      this.orderService.getOrder(this.orderId)
        .subscribe(
          (data) => {
            this.orderDetails = data;
          },
          (error) => {
            this.errorService.showSomeThingWentWrongMessage();
          }
        );
    }
  }

  exportAsPDF() {
    let data = document.getElementById('MyDIv');
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/jpeg');
      let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); //Generates PDF in portrait mode
      // pdf.addImage(contentDataURL, 'JPEG', 0, 1, 29.7, 21.0);
      pdf.addImage(contentDataURL, 'JPEG', 0, 0, 29.7, 21.0);
      const orderAttachment: OrderAttachment = {
        fileName: (this.orderId + Math.random()).toString() + ".pdf",
        fileContent: btoa(pdf.output())
      };
      this.taskService.uploadFile(this.orderId, orderAttachment).subscribe((data) => console.log(data));

      pdf.save('Filename.pdf');
    });


    /* html2canvas(data, { allowTaint: true }).then(canvas => {
       let HTML_Width = canvas.width;
       let HTML_Height = canvas.height;
       let top_left_margin = 15;
       let PDF_Width = HTML_Width + (top_left_margin * 2);
       let PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
       let canvas_image_width = HTML_Width;
       let canvas_image_height = HTML_Height;
       let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
       canvas.getContext('2d');
       let imgData = canvas.toDataURL("image/jpeg", 1.0);
       let pdf = new jspdf('p', 'pt', [PDF_Width, PDF_Height]);
       pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
       for (let i = 1; i <= totalPDFPages; i++) {
         pdf.addPage([PDF_Width, PDF_Height], 'p');
         pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
       }
       pdf.save("HTML-Document.pdf");
     });*/
  }

}
