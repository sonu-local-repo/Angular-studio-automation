import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QuoteLineItemService } from '@core/services/entities/quoteLine.service';
import { QuoteLineItem } from '@shared/models/quotelineitem.model';

@Component({
  selector: 'app-create-quote-line-modal',
  templateUrl: './create-quote-line-modal.component.html',
  styleUrls: ['./create-quote-line-modal.component.scss']
})
export class CreateQuoteLineModalComponent implements OnInit {
  eventFormGroup: FormGroup;
  quoteId = 0;
  optyId = 0;
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<CreateQuoteLineModalComponent>,
    private quoteLineService: QuoteLineItemService,
    @Inject(MAT_DIALOG_DATA) private inputData
  ) {
    this.quoteId = this.inputData.quoteId;
    this.optyId = this.inputData.optyId;
  }

  ngOnInit() {
    console.log(this.quoteId, this.optyId);
    this.buildform();
  }

  buildform() {
    this.eventFormGroup = this.fb.group({
      type: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['New', Validators.required],
      owner: 0,
      rate: 0,
      description: ['']
    });
  }

  saveEvent() {
    this.errorMessage = '';
    const quoteLineItem = new QuoteLineItem();
    Object.assign(quoteLineItem, this.eventFormGroup.value);
    quoteLineItem.optyId = this.optyId;
    quoteLineItem.quoteId = this.quoteId;
    quoteLineItem.status = 'New';
    quoteLineItem.lineType = 'QuoteLine'
    console.log(quoteLineItem);
    this.quoteLineService.createQuoteLineItem([quoteLineItem]).subscribe(data => {
      this.matDialogRef.close();
    },
      (error) => {
        this.errorMessage = 'Unable to save the record. Please try again';
      });
  }

}
