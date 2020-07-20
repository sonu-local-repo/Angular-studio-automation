import { Component, OnInit, Input, Inject } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EmailService } from '@shared/services/email.service';
import { Email } from '@shared/models/emai.model';

@Component({
  selector: 'app-compose-email',
  templateUrl: './compose-email.component.html',
  styleUrls: ['./compose-email.component.scss']
})
export class ComposeEmailComponent implements OnInit {

  public Editor = ClassicEditor;
  public model = {
    editorData: ''
  };
  public toAddress = '';
  public cc;
  public subject;
  constructor(
    @Inject(MAT_DIALOG_DATA) private inputData: any,
    private emailService: EmailService,
    private matDialgoRef: MatDialogRef<ComposeEmailComponent>

  ) {


  }

  ngOnInit() {
    console.log('After view init' + this.inputData);
    if (this.inputData !== undefined) {
      this.toAddress = this.inputData.email;
      if (this.inputData.body) {
        this.model.editorData = this.inputData.body;
      }

    }
  }

  sendEmail() {
    const emailObj = new Email();
    emailObj.content = this.model.editorData;
    emailObj.to = this.toAddress;
    emailObj.subject = this.subject;
    console.log(emailObj);
    this.emailService.sendEmail(emailObj).subscribe(data => {
      console.log(data)
      this.matDialgoRef.close();
    });
  }
}
