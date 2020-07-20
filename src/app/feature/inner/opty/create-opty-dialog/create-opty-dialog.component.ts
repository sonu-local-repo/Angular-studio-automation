import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Opportunity } from '@shared/models/opty.model';
import { OptyService } from '@core/services/entities/opty.service';
import { QuoteService } from '@core/services/entities/quote.service';
import { map, concatMap, debounceTime } from 'rxjs/operators';
import { Quote } from '@shared/models/quote.model';
import { of, Subject } from 'rxjs';
import { LookupAccountModalComponent } from '../../accounts/lookup-account-modal/lookup-account-modal.component';
import { AccountsService } from '@core/services/entities/accounts.service';
import { HttpResponse } from '@angular/common/http';
import { Account } from '@shared/models/account.model';

@Component({
  selector: 'app-create-opty-dialog',
  templateUrl: './create-opty-dialog.component.html',
  styleUrls: ['./create-opty-dialog.component.scss'],
})
export class CreateOptyDialogComponent implements OnInit, AfterViewInit {
  optyFormGroup: FormGroup;
  createdOptyId = 0;
  accountId = null;
  priorityList = [];
  selected = 'Normal';
  private subject: Subject<string> = new Subject();
  constructor(
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateOptyDialogComponent>,
    private optyService: OptyService,
    private quoteService: QuoteService,
    private accountService: AccountsService
  ) { }

  ngOnInit() {
    this.buildOptyForm();
    this.priorityList = [
      { value: 'Normal', text: 'Normal' },
      { value: 'Medium', text: 'Medium' },
      { value: 'High', text: 'High' }
    ];
  }

  ngAfterViewInit() {
  }

  buildOptyForm() {
    this.optyFormGroup = this.formBuilder.group({
      status: 'Open',
      name: '',
      type: '',
      stage: 'Prospecting',
      dueDate: '',
      source: '',
      priority: '',
      accounts: this.formBuilder.group({
        name: '',
        status: '',
        phone: '',
        mobile: '',
        email: '',
        addresses: this.formBuilder.array([this.formBuilder.group({
          address1: ['', Validators.required],
          address2: '',
          city: '',
          state: '',
          zip: ['', Validators.required]
        })])
      }),
      quote: this.formBuilder.group({
        quoteLine: this.formBuilder.array([this.formBuilder.group({
          type: ['', Validators.required],
          source: '',
          status: 'New',
          description: '',
          dueDate: ['', Validators.required],
          lineType: 'QuoteLine'
        })])
      })
    });
  }

  saveOpty() {
    let opty = new Opportunity();
    opty = Object.assign(opty, this.optyFormGroup.value);
    const b = Object.create(this.optyFormGroup.value);
    opty.accounts = [b.accounts];
    this.optyService.createOpty(opty).pipe(
      concatMap(data => {
        let quote = new Quote();
        quote = b.quote;
        quote.accountId = data.accounts[0].id;
        quote.optyId = data.id;
        this.createdOptyId = data.id;
        return this.quoteService.createQuote(quote);
      }),
      map(data => {
        return data;
      })
    ).subscribe(data => {
      this.dialogRef.close(this.createdOptyId);
    });
  }

  addQuoteLineItems() {
    this.getQuoteLineItems().push(
      this.formBuilder.group({
        type: ['', Validators.required],
        source: '',
        status: 'New',
        description: '',
        dueDate: '',
        lineType:'QuoteLine'
      })
    );
  }

  removeQuoteLineItems(index: number) {
    this.getQuoteLineItems().removeAt(index);
  }

  getQuoteLineItems() {
    return this.optyFormGroup.get('quote').get('quoteLine') as FormArray;
  }

  getOpportunityName() {
    return this.optyFormGroup.get('accounts').get('name');
  }

  getAccountAddress() {
    return this.optyFormGroup.get('accounts').get('addresses') as FormArray;
  }

  searchAccount(searchText, $event) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minHeight = '60%';
    dialogConfig.data = { data: searchText };
    const dialogRef = this.matDialog.open(LookupAccountModalComponent, dialogConfig);
    $event.preventDefault();
    // $event.stopPropogation();
    dialogRef.afterClosed().subscribe(data => {
      this.accountId = data.id;
      this.accountService.getAccount(this.accountId).pipe(map(resp => resp.body)).subscribe((account: Account) => {
        this.optyFormGroup.patchValue({
          name: data.name,
          accounts: {
            name: account.name,
            status: account.status,
            phone: account.phone,
            mobile: account.mobile,
            email: account.email,
            addresses: [{
              address1: account.addresses[0].address1,
              address2: account.addresses[0].address2,
              city: account.addresses[0].city,
              state: account.addresses[0].state,
              zip: account.addresses[0].zip
            }]
          }
        });
      });
    });
  }

  onAccountNameChange(event) {
    // this.subject.next(accountName);
    this.optyFormGroup.patchValue({
      name: event.target.value
    });
  }

}
