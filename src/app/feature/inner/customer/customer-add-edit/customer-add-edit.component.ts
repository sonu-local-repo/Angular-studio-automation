import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { INDIAN_STATE_LIST } from '@shared/constants/state-list.constant';
import { ActionService } from '@shared/services/action.service';
import { CustomerService } from '../customer.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-add-edit',
  templateUrl: './customer-add-edit.component.html',
  styleUrls: ['./customer-add-edit.component.scss']
})
export class CustomerAddEditComponent implements OnInit {

  isEditMode: boolean;
  customerDetails: Customer;
  customerFormGroup: FormGroup;
  stateList = INDIAN_STATE_LIST;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private actionService: ActionService,
    private dialogRef: MatDialogRef<CustomerAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.isEditMode = !actionService.isAllNullOrEmptyObject(data);
    this.customerDetails = data ? data.customer : null;
  }

  /* Lifecycle Hooks */
  ngOnInit() {
    this.buildForm();
    this.bindFormData();
  }

  /* Private Methods */
  private buildForm() {
    this.customerFormGroup = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null),
      mobile: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      email: new FormControl(null,
        [Validators.pattern('[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]),
      description: new FormControl(null),
      address: new FormControl(null,[Validators.required]),
      city: new FormControl(null, [Validators.required]),
      state: new FormControl('KL'),
      zip: new FormControl(null, [Validators.required]),
    });
  }

  private bindFormData() {
    if (!this.isEditMode) { return; }
    this.customerFormGroup.patchValue(this.customerDetails);
  }

  private addCustomer(customer: Customer) {
    customer.createdAt = '2019-11-03';
    customer.createdBy = 28;
    this.customerService.createCustomer(customer).subscribe((data) => {
      this.dialogRef.close(data);
    });
  }

  private updateCustomer(customer: Customer) {
    this.customerService.updateCustomer(customer).subscribe((data) => {
      this.dialogRef.close(data);
    });
  }

  /* Public Methods */
  onCancel() {
    this.dialogRef.close(null);
  }

  onSave() {

    if (this.customerFormGroup.invalid) { return; }

    let customer = new Customer();

    if (!this.isEditMode) {
      customer = this.customerFormGroup.value;
      this.addCustomer(customer);
    } else {
      customer = this.customerDetails;
      customer = Object.assign(customer, this.customerFormGroup.value);
      this.updateCustomer(customer);
    }
  }
}
