import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AccountsService } from '@core/services/entities/accounts.service';
import { Account } from '@shared/models/account.model';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrls: ['./create-account-modal.component.scss']
})
export class CreateAccountModalComponent implements OnInit {
  formGroup: FormGroup;
  errorMessage = null;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountsService,
    private dialogRef: MatDialogRef<CreateAccountModalComponent>
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      status: ['Active'],
      phone: [''],
      mobile: [''],
      email: [''],
      type: [''],
      addresses: this.formBuilder.array([this.formBuilder.group({
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: ['', Validators.required],
        type: ['']
      })])
    });
  }

  getAccountAddress() {
    return this.formGroup.get('addresses') as FormArray;
  }

  changeEvent($event) {
    this.errorMessage = null;
  }
  saveAccount() {
    const account = new Account();
    Object.assign(account, this.formGroup.value);
    this.accountService.createAccount(account).subscribe((data: Account) => {
      // console.log(data)
      this.dialogRef.close(data);
    },
      (error) => {
        this.errorMessage = 'Unable to create the record. Please try again or contact admin';
      }
    );
  }
}
