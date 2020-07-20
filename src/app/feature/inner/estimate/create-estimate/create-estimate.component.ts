import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { Quote } from '@shared/models/quote.model';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import html2canvas, { Options } from 'html2canvas';
import { formatDate } from '@angular/common';
import { TaskService } from '../../tasks/task.service';
import { Attachment } from '../../order/models/order-attachment';
import * as jspdf from 'jspdf';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { QuoteLineItem } from '@shared/models/quotelineitem.model';
import { EstimateService } from '@core/services/entities/estimate.service';
import * as jsPDF from 'jspdf';
import { Estimate } from '@shared/models/estimate.model';
import { EstimateLineItems } from '@shared/models/estimateLine.model';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ComposeEmailComponent } from '@shared/components/compose-email/compose-email.component';
import { DataTransferService } from '@shared/services/dataTransferService.service';
import { Opportunity } from '@shared/models/opty.model';
(window as any).html2canvas = html2canvas;

@Component({
  selector: 'app-create-estimate',
  templateUrl: './create-estimate.component.html',
  styleUrls: ['./create-estimate.component.scss'],
})
export class CreateEstimateComponent implements OnInit {
  // @Optional() @Input() private quote: Quote;
  private data;
  private quote;
  private estimateItems: FormArray;
  private optyId;
  accountName = '';
  accountAddress = '';
  totalEstimateAmount = 0;
  displayedColumns = ['Type:100', 'Service:100', 'Description:100', 'Qty:5', 'Rate:10', 'Total:10'];
  formGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private taskService: TaskService,
    private estimateService: EstimateService,
    private datePipe: DatePipe,
    @Optional() @Inject(MAT_DIALOG_DATA) private inputData,
    private dialogRef: MatDialogRef<CreateEstimateComponent>,
    private emailDialog: MatDialog,
    private dataService: DataTransferService
  ) {
    // this.data = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {
    this.dataService.getData.subscribe((opty) => {
      this.accountName = opty.opty.accounts[0].name;
    });
    this.buildForm();
    this.initializeItems();
    // console.log(this.quote);
  }

  initializeItems() {
    if (this.inputData) {
      const quoteLine: SelectionModel<QuoteLineItem> = this.inputData.quoteLine;
      this.quote = this.inputData.quote as Quote;
      this.optyId = this.quote.optyId;
      // this.quote = this.data.quote as Quote;
      quoteLine.selected.forEach(element => {
        this.getEstimateLineItems().push(
          this.formBuilder.group({
            item: element.type,
            description: element.description,
            // type: 'Service',
            qty: 0,
            rate: 0,
            total: 0,
            qliId: element.id
          })
        );
      });
    }
  }

  getEstimateLineItems() {
    return this.formGroup.get('estimateLineItems') as FormArray;
  }

  removeEstimateLineItems(index: number) {
    this.getEstimateLineItems().removeAt(index);
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      subTotal: 0,
      discount: 0,
      subDiscount: 0,
      taxRate: 0,
      totalTax: 0,
      shipping: 0,
      total: 0,
      estimateLineItems: this.formBuilder.array([]),
    });
  }

  addNewLineItem() {
    this.getEstimateLineItems().push(
      this.formBuilder.group({
        item: '',
        description: '',
        // type: 'Service',
        qty: 0,
        rate: 0,
        total: 0,
        qliId: 0
      })
    );
  }

  calculateLineItem($event, i) {
    console.log(i, $event.target.value);
    const formControl = this.getEstimateLineItems()
    this.getEstimateLineItems().controls[i].patchValue(
      { total: parseInt(formControl.controls[i].value.qty, 10) * parseInt(formControl.controls[i].value.rate, 10) });
    let total = 0;
    formControl.controls.forEach(element => {
      total = total + parseInt(element.value.total, 10);
    });
    this.totalEstimateAmount = total;
    this.formGroup.patchValue({ subTotal: total, total: total });
  }

  calculateTotal($event){

  }

  createEstimateObject(): Estimate {
    const estimateObject = new Estimate();
    estimateObject.estimateDate = this.datePipe.transform(new Date(), 'y-MM-dd');
    estimateObject.quoteId = this.quote.id;
    estimateObject.optyId = this.quote.optyId;
    estimateObject.status = 'New';
    estimateObject.totalAmount = this.formGroup.get('total').value;
    estimateObject.subTotal = this.formGroup.get('subTotal').value;
    estimateObject.discount = this.formGroup.get('discount').value;
    estimateObject.taxRate = this.formGroup.get('taxRate').value;
    estimateObject.totalTax = this.formGroup.get('totalTax').value;
    estimateObject.handling = this.formGroup.get('shipping').value;
    const estArray: EstimateLineItems[] = [];
    this.getEstimateLineItems().controls.forEach(element => {
      const estimateLineItem = new EstimateLineItems();
      estimateLineItem.amount = element.get('rate').value;
      estimateLineItem.quantity = element.get('qty').value;
      estimateLineItem.description = element.get('description').value;
      estimateLineItem.quoteLineId = element.get('qliId').value;
      estArray.push(estimateLineItem);
    });
    estimateObject.estimateLineItems = estArray;
    return estimateObject;
  }

  sendEmail() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { body: document.getElementById('estimate_pdf').innerHTML }
    this.emailDialog.open(ComposeEmailComponent, dialogConfig);
  }

  savePDF() {
    const data = document.getElementById('estimate_pdf');
    const opts: Partial<Options> = {
      logging: false,
      scale: 2,
      backgroundColor: '#fff'
    };
    html2canvas(data, opts)
      .then((canvas) => {
        const dt = formatDate(new Date(), 'Mdyyhmmss', 'en');
        const imgData = canvas.toDataURL('image/jpeg');
        const pdfDoc = new jspdf({
          orientation: 'potrait',
          unit: 'mm'
        });
        const imgProps = pdfDoc.getImageProperties(imgData);
        let position = 0;
        const pageHeight = 295;
        const pdfWidth = pdfDoc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdfDoc.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
        let heightLeft = pdfHeight;
        heightLeft -= pageHeight;
        // tslint:disable-next-line:no-unused-expression
        while (heightLeft >= 0) {
          position = heightLeft - pdfHeight;
          pdfDoc.addPage();
          pdfDoc.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
          heightLeft -= pageHeight;
        }
        pdfDoc.save('test' + dt + '.pdf');
        this.createEstimateObject();
        this.estimateService.createEstimate(this.optyId, this.createEstimateObject()).pipe(
        ).subscribe((re) => {
          console.log(re)
          this.dialogRef.close({ esimateCreated: true });
        });
      });
  }
}

