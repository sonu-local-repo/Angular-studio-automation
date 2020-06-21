import { Component, OnInit, Input, Inject, AfterViewInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ServiceService } from '../../other/service.service';
import { DropdownItem } from '@shared/models/dropdown-item.model';
import { OrderPage } from '../models/order-page.model';
import { Order } from '../models/order';
import { Customer } from '../../customer/models/customer.model';
import { ModalService } from '@shared/services/modal.service';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { ActionService } from '@shared/services/action.service';
import { CustomerService } from '../../customer/customer.service';
import { CustomerLookupComponent } from '../../customer/customer-lookup/customer-lookup.component';
import { CustomerAddEditComponent } from '../../customer/customer-add-edit/customer-add-edit.component';
import { OrderConfigurePagesComponent } from '../order-configure-pages/order-configure-pages.component';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SettingsService } from '../../settings/settings.service';
import { Lov } from '@shared/models/lov-model';
import { fromEvent } from 'rxjs';
@Component({
  selector: 'app-order-workflow',
  templateUrl: './order-workflow.component.html',
  styleUrls: ['./order-workflow.component.css'],
})

export class OrderWorkflowComponent implements OnInit, AfterViewInit {

  @ViewChild('searchRef', { static: true }) searchRef: ElementRef;
  orderForm: FormGroup;
  orderTypeList: DropdownItem[] = [];
  priorityList: DropdownItem[] = [];
  albumTypeList: DropdownItem[] = [];
  coverTypeList: DropdownItem[] = [];
  bagTypeList: DropdownItem[] = [];
  colorList: DropdownItem[] = [];
  selectedType: any;
  pages: OrderPage[] = [];
  canSetContactAsCustomer = false;
  isEditMode: boolean;
  orderId: number;
  parentOrderId: number;
  customerId: number;
  currentOrder: Order;
  customer: Customer;
  minDueDate = new Date();
  isFormSubmitted = false;
  subtype = [];
  lovData: Lov[];
  inputDueDate = new Date();
  allowsubmit = false;
  orderStatus = 'New';
  saveError = '';
  disableCreateSubOrder = false;
  ngOnInit() {
    this.initVariables();
    if (this.inputData.customerId) {
      this.getCustomerDetails(this.inputData.customerId);
    }
    if (this.inputData.source === 'SubOrderScreen') {
      this.disableCreateSubOrder = true;
    }
    this.buildForm(this.inputData.orderObject);
    if (this.inputData.orderObject) {
      this.isEditMode = true;
      this.inputDueDate = new Date(this.inputData.orderObject.dueDate);
      this.pages = this.inputData.orderObject.pages;
      this.orderStatus = this.inputData.orderObject.status;
      this.orderForm.get('coupleName').setValue(this.inputData.orderObject.value3);
      this.orderForm.get('colour').setValue(this.inputData.orderObject.value4);
    } else if (this.inputData.orderId) {
      this.parentOrderId = this.inputData.orderId;
      this.orderForm.get('coupleName').setValue(this.inputData.coupleName);
      this.orderForm.get('colour').setValue(this.inputData.color);
    }
    this.subscribeEvents();
  }

  constructor(
    private dialog: MatDialog,
    private modalService: ModalService,
    private orderService: OrderService,
    private router: Router,
    private actionService: ActionService,
    private customerService: CustomerService,

    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
    private matDialogRef: MatDialogRef<OrderWorkflowComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any
  ) { }

  ngAfterViewInit(): void {
    fromEvent<any>(this.searchRef.nativeElement, 'keyup').subscribe(event => {
      if (event.key === 'Enter') {
        this.lookupCustomer();
      }
    });
  }

  private buildForm(order: Order = null) {

    this.orderForm = this.formBuilder.group({
      customerName: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null,
        Validators.pattern('[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')],
      type: [order ? order.type : null, Validators.required],
      subType: [order ? order.subType : null],
      size: [order ? order.size : null],
      quantity: [order ? order.quantity : 1, Validators.required],
      priority: [order ? order.priority : 'Low', Validators.required],
      dueDate: new FormControl(order ? new Date(this.inputData.orderObject.dueDate) : new Date(),
        [Validators.required]),
      coupleName: [order ? order.value3 : '', Validators.required],
      colour: [order ? order.value4 : '', Validators.required],
      notes: [order ? order.notes : ''],
      albumType: [order ? order.value0 : ''],
      coverType: [order ? order.value1 : ''],
      bagType: [order ? order.value2 : ''],
      pages: [order ? order.pages : '']
    });
  }

  private subscribeEvents() {
    this.orderForm.get('type').valueChanges
      .subscribe(value => {
        if (value) {
          this.subtype = [];
          this.lovData.filter((item) => item.type === 'ORDER_SUB_TYPE' && item.subType === value && item.status === 'Active')
            .map(val => {
              this.subtype.push(val.value.trim());
            });
          if (this.subtype.length > 0) {
            this.orderForm.get('subType').enable();
            this.orderForm.get('subType').setValidators(Validators.required);
            this.orderForm.get('subType').updateValueAndValidity();
          } else {
            this.orderForm.get('subType').disable();
            this.orderForm.get('coverType').disable();
            this.orderForm.get('albumType').disable();
            this.orderForm.get('bagType').disable();
          }
        }
      });
    this.orderForm.get('subType').valueChanges
      .subscribe(value => {
        if (value) {
          if (value.toLowerCase() === 'album') {
            this.orderForm.get('coverType').enable();
            this.orderForm.get('bagType').enable();
            this.orderForm.get('albumType').enable();

            this.orderForm.get('albumType').setValidators(Validators.required);
            this.orderForm.get('coverType').setValidators(Validators.required);
            this.orderForm.get('bagType').setValidators(Validators.required);
          } else {
            this.orderForm.get('coverType').disable();
            this.orderForm.get('bagType').disable();
            this.orderForm.get('albumType').disable();
            this.allowsubmit = true;
          }
          this.orderForm.get('albumType').updateValueAndValidity();
          this.orderForm.get('coverType').updateValueAndValidity();
          this.orderForm.get('bagType').updateValueAndValidity();
          this.allowsubmit = true;
        }
      });
  }

  private getCustomerDetails(customerId) {
    this.customerService.getCustomer(customerId).subscribe((data) => {
      this.customer = data;
      this.orderForm.get('customerName').setValue(this.customer.name);
      this.orderForm.get('phone').setValue(this.customer.mobile);
      this.orderForm.get('email').setValue(this.customer.email);
      this.customerId = this.customer.id;
      this.canSetContactAsCustomer = true;
    });
  }

  private initVariables() {
    this.settingsService.getListofValues().subscribe(data => {
      this.lovData = data;

      if (this.inputData.orderObject) {
        this.lovData.filter((item) =>
          item.type === 'ORDER_SUB_TYPE' && item.subType === this.inputData.orderObject.type && item.status === 'Active')
          .map(val => {
            this.subtype.push(val.value.trim());
            this.orderForm.patchValue({
              subType: this.inputData.orderObject.subType
            });
          });
        this.orderForm.get('type').setValue(this.inputData.orderObject.type);
      }

      data.filter((item) => item.type === 'ORDER_PRIORITY' && item.status === 'Active').map(val => {
        this.priorityList.push({
          value: val.value,
          text: val.value
        });
      });

      data.filter((item) => item.type === 'ALBUM_TYPE' && item.status === 'Active').map(val => {
        this.albumTypeList.push({
          value: val.value,
          text: val.value
        });
      });
      data.filter((item) => item.type === 'ORDER_TYPE' && item.subType === '' && item.status === 'Active').map(val => {
        this.orderTypeList.push({
          value: val.value,
          text: val.value
        });
      });
      data.filter((item) => item.type === 'COVER_TYPE' && item.subType === '' && item.status === 'Active').map(val => {
        this.coverTypeList.push({
          value: val.value,
          text: val.value
        });
      });
      data.filter((item) => item.type === 'BAG_TYPE' && item.subType === '' && item.status === 'Active').map(val => {
        this.bagTypeList.push({
          value: val.value,
          text: val.value
        });
      });
      data.filter((item) => item.type === 'COLOR_TYPE' && item.subType === '' && item.status === 'Active').map(val => {
        this.colorList.push({
          value: val.value,
          text: val.value
        });
      });
    });
  }

  lookupCustomer() {
    const data = this.orderForm.value.customerName ? this.orderForm.value.customerName : '';
    const dialogConfig = this.modalService.setDialogConfig(true, false, '780px', data);
    this.dialog.open(CustomerLookupComponent, dialogConfig)
      .afterClosed().subscribe(customer => {
        if (customer) {

          this.customer = customer;
          this.orderForm.get('customerName').setValue(this.customer.name);
          this.orderForm.get('phone').setValue(this.customer.mobile);
          this.orderForm.get('email').setValue(this.customer.email);
          this.customerId = this.customer.id;
          this.canSetContactAsCustomer = true;
        }
      });
  }

  invalidForm(step: string) {
    return this.orderForm.status === 'INVALID' ? true : false;
  }

  addCustomer() {
    const dialogConfig = this.modalService.setDialogConfig(true, true, '780px');
    this.dialog.open(CustomerAddEditComponent, dialogConfig)
      .afterClosed().subscribe(customer => {
        if (customer) {
          this.customer = customer;
          this.canSetContactAsCustomer = true;
        }
      });
  }

  setContactAsCustomer() {
    this.orderForm.patchValue({
      customerName: this.customer.name,
      phone: this.customer.phone,
      email: this.customer.email,
    });
    this.canSetContactAsCustomer = false;
  }

  configurePages() {
    if (this.pages) {
      this.pages.map((page) => {
        page.isSelected = false;
        return page;
      });
    }
    const dialogConfig = this.modalService.setDialogConfig(true, true, '100%',
      {
        pages: this.pages,
        orderType: this.orderForm.value.subType
      }, 'order-page-details-dialog');
    const dialogRef = this.dialog.open(OrderConfigurePagesComponent, dialogConfig)
      .afterClosed().subscribe(data => {
        if (data.save) {
          this.saveError = '';
          this.pages = data.data;
          this.allowsubmit = this.pages.length > 1 ? true : false;
          dialogRef.unsubscribe();
        }
      });
  }

  onTypeSelected(event, type) {
    if (event.isUserInput) {
      this.selectedType = type;
    }
  }

  getCustomerAddress() {
    if (this.customer) {
      return [
        this.actionService.getEmptyIfNull(this.customer.address),
        this.actionService.getEmptyIfNull(this.customer.city),
        this.actionService.getEmptyIfNull(this.customer.zip)
      ]
        .filter(Boolean)
        .join(', ');
    } else {
      return '';
    }
  }

  deleteCustomer() {
    const confirm = { question: 'Are you sure to delete this customer', yes: 'Delete', no: 'Cancel' };
    const dialogConfig = this.modalService.setDialogConfig(true, false, '780px', confirm);
    this.dialog.open(ConfirmModalComponent, dialogConfig)
      .afterClosed().subscribe(flag => {
        if (flag) {
          this.customer = null;
          this.orderForm.patchValue({
            customerName: null,
            phone: null,
            email: null,
          });
        }
      });
  }

  goToCustomer() {
    window.open(`/customer/${this.customer.id}`, '_blank');
  }

  onClear() {
    this.orderForm.reset();
  }

  private addOrder(order: Order) {
    order.status = 'Created';
    this.orderService.createOrder(order)
      .subscribe((data) => {
        this.modalService.showNotification('New order created', 'Close');
        this.matDialogRef.close({ createNewOrder: true, orderId: this.orderId });
        if (this.parentOrderId > 0) {
          this.redirectTo(`orders/${this.parentOrderId}`);
        } else {
          this.redirectTo(`orders/${order.id}`);
        }
      });
  }

  checkInvalidPageConfiguration(): boolean {
    this.saveError = '';
    let showError = false;
    if ((this.orderForm.value.type === 'Printing' && this.orderForm.value.subType === 'Album')) {
      if (this.pages) {
        if (this.pages.length === 0 || this.pages.filter(item => item.pageDetails.length === 0).length > 0) {
          showError = true;
        } else {
          showError = false;
        }
      } else {
        showError = true;
      }

    } else {
      showError = false;
    }
    return showError;
  }

  onSave() {
    this.isFormSubmitted = true;
    if (this.orderForm.invalid || this.checkInvalidPageConfiguration()) {
      this.saveError = this.checkInvalidPageConfiguration() ? 'Album pages are not configured. Please review' :
        'There are validation errors. Please review';
      return;
    } else {
      const order = new Order(this.orderForm.value);
      order.customerId = this.customer.id;
      order.pages = this.pages;
      order.value0 = this.orderForm.value.albumType;
      order.value1 = this.orderForm.value.coverType;
      order.value3 = this.orderForm.value.coupleName;
      order.value4 = this.orderForm.value.colour;
      console.log(order);
      if (!this.isEditMode) {
        if (this.parentOrderId > 0) {
          order.parentOrderId = this.parentOrderId;
        }
        order.status = 'Created';
        this.orderService.createOrder(order)
          .subscribe((data) => {
            this.modalService.showNotification('New order created', 'Close');
            this.matDialogRef.close({ createNewOrder: false, orderId: this.orderId });
            if (this.parentOrderId > 0) {
              this.redirectTo(`orders/${this.parentOrderId}`);
            } else {
              this.redirectTo(`orders/${data.id}`);
            }
          });
      } else {
        order.id = this.inputData.orderObject.id;
        order.status = this.orderStatus === 'Draft' ? 'Created' : this.inputData.orderObject.status;
        this.orderService.updateOrder(order)
          .subscribe((data) => {
            this.modalService.showNotification('Order updated successfully', 'Close');
            this.matDialogRef.close({ createNewOrder: false, orderId: this.orderId });
            if (this.parentOrderId > 0) {
              this.redirectTo(`orders/${this.parentOrderId}`);
            } else {
              this.redirectTo(`orders/${order.id}`);
            }
          });
      }
    }
  }

  onCreateSubOrder($event) {
    this.isFormSubmitted = true;
    if (this.orderForm.invalid || this.checkInvalidPageConfiguration()) {
      this.saveError = this.checkInvalidPageConfiguration() ? 'Album pages are not configured. Please review' :
        'There are validation errors. Please review';
      return;
    } else {
      const order = new Order(this.orderForm.value);
      order.status = 'Created';
      order.customerId = this.customer.id;
      order.pages = this.pages;
      order.value3 = this.orderForm.value.coupleName;
      order.value4 = this.orderForm.value.colour;
      order.parentOrderId = this.parentOrderId > 0 ? this.parentOrderId : null;
      if (!this.isEditMode) {
        this.orderService.createOrder(order)
          .subscribe((data) => {
            const opParentOrderId = this.inputData.orderId ? this.parentOrderId : data.id;
            this.matDialogRef.close({
              createNewOrder: true,
              orderId: opParentOrderId,
              customerId: this.customer.id,
              coupleName: this.orderForm.get('coupleName').value,
              color: this.orderForm.get('colour').value
            });
          });
      }
    }
  }

  saveAsDraft() {
    this.isFormSubmitted = true;
    const order = new Order(this.orderForm.value);
    order.customerId = this.customer.id;
    order.pages = this.pages;
    order.status = 'Draft';
    order.value3 = this.orderForm.value.coupleName;
    order.value4 = this.orderForm.value.colour;
    if (!this.isEditMode) {
      this.orderService.createOrder(order)
        .subscribe((data) => {
          this.matDialogRef.close({ createNewOrder: false, orderId: this.orderId });
          if (this.parentOrderId > 0) {
            this.redirectTo(`orders/${this.parentOrderId}`);
          } else {
            this.redirectTo(`orders/${data.id}`);
          }
        });
    } else {
      order.id = this.inputData.orderObject.id;
      this.orderService.updateOrder(order)
        .subscribe((data) => {
          this.matDialogRef.close({ createNewOrder: false, orderId: this.orderId });
          if (this.parentOrderId > 0) {
            this.redirectTo(`orders/${this.parentOrderId}`);
          } else {
            this.redirectTo(`orders/${data.id}`);
          }
        });
    }
  }
  private redirectTo(uri: string) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri]);
    });
  }
}
