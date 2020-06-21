
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { OrderService } from "../order.service";
import { Attachment } from "../models/attachment";
import { saveAs } from 'file-saver';
import {SubjectService} from "../subject-service";


@Component({
  selector: 'app-order-attachment',
  templateUrl: './order-attachment.component.html',
  styleUrls: ['./order-attachment.component.scss']
})
export class OrderAttachmentComponent implements OnInit {

  attachments: MatTableDataSource<Attachment> = new MatTableDataSource([]);

  displayedColumns: string[] = ['id', 'name', 'createdDate', 'view'];
  @Input() orderId: number;


  constructor(private orderService: OrderService, private subject: SubjectService) { }

  ngOnInit() {
    this.fetchAttachments();
    this.refresh();
  }


  private fetchAttachments() {
    this.orderService.getAllAttachments(this.orderId).subscribe(data => this.attachments.data = data);
  }

  // downloadAttachment(attachmentId: number) {
  //   this.orderService.downloadAttachment(attachmentId).subscribe(data => console.log(data))

  // }

  viewAttachment(id: number) {
    this.orderService.viewAttachment(id).subscribe(data => {
      let file = new Blob([data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      saveAs(file, `${id}.pdf`); //if you want to save it - you need file-saver for this : https://www.npmjs.com/package/file-saver
      window.open(fileURL, "_blank"); // if you want to open it in new tab
    })
  }
  refresh() {
    this.subject.events$.subscribe(() => {
      this.fetchAttachments()
    });
  }
}
