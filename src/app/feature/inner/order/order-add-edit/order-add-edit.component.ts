import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { BreadcrumbService } from '@shared/components/layout/breadcrumb/breadcrumb.service';
import { DropdownItem } from '@shared/models/dropdown-item.model';
import { ActionService } from '@shared/services/action.service';
import { ErrorService } from '@shared/services/error.service';
import { ModalService } from '@shared/services/modal.service';
import { CustomerAddEditComponent } from '../../customer/customer-add-edit/customer-add-edit.component';
import { CustomerLookupComponent } from '../../customer/customer-lookup/customer-lookup.component';
import { CustomerService } from '../../customer/customer.service';
import { Customer } from '../../customer/models/customer.model';
import { ServiceService } from '../../other/service.service';
import { Order } from '../models/order';
import { OrderPage } from '../models/order-page.model';
import { OrderConfigurePagesComponent } from '../order-configure-pages/order-configure-pages.component';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-add-edit',
  templateUrl: './order-add-edit.component.html',
  styleUrls: ['./order-add-edit.component.scss']
})
export class OrderAddEditComponent implements OnInit {

  orderForm: FormGroup;
  orderTypeList = [];
  priorityList: DropdownItem[];
  albumTypeList: DropdownItem[];
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

  constructor(
    private dialog: MatDialog,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute,
    private serviceService: ServiceService,
    private orderService: OrderService,
    private router: Router,
    private actionService: ActionService,
    private customerService: CustomerService,
    private breadcrumbService: BreadcrumbService,
    private errorService: ErrorService,
  ) { }

  /* Lifecycle Hooks */
  ngOnInit() {
    this.buildForm();
    this.subscribeEvents();
    this.initVariables();
    this.getAllServices();
    this.getOrderDetails();
  }

  /* Private Methods */
  private buildForm() {
    this.orderForm = new FormGroup({
      customerName: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null,
        [Validators.pattern('[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]),
      type: new FormControl(null, [Validators.required]),
      subType: new FormControl(null),
      size: new FormControl(null),
      quantity: new FormControl(1, [Validators.required]),
      priority: new FormControl('Normal', [Validators.required]),
      dueDate: new FormControl('', [Validators.required]),
      notes: new FormControl(null),
      albumType: new FormControl(null),
      coverType: new FormControl(null),
      bagType: new FormControl(null),
    });
  }

  private subscribeEvents() {
    this.orderForm.get('type').valueChanges
      .subscribe(value => {
        if (value) {
          const selectedItem = this.orderTypeList.find((item) => item.name.toLowerCase() === value.toLowerCase());
          if (selectedItem.child.length > 0) {
            this.orderForm.get('subType').setValidators(Validators.required);
          } else {
            this.orderForm.get('subType').clearValidators();
          }
          this.orderForm.get('subType').updateValueAndValidity();
        }
      });

    this.orderForm.get('subType').valueChanges
      .subscribe(value => {
        if (value) {
          if (value.toLowerCase() === 'album') {
            this.orderForm.get('albumType').setValidators(Validators.required);
            this.orderForm.get('coverType').setValidators(Validators.required);
            this.orderForm.get('bagType').setValidators(Validators.required);
          } else {
            this.orderForm.get('albumType').clearValidators();
            this.orderForm.get('coverType').clearValidators();
            this.orderForm.get('bagType').clearValidators();
          }
          this.orderForm.get('albumType').updateValueAndValidity();
          this.orderForm.get('coverType').updateValueAndValidity();
          this.orderForm.get('bagType').updateValueAndValidity();
        }
      });

    this.activatedRoute.queryParams.subscribe(params => {
      this.parentOrderId = parseInt(params.parentOrderId || 0, 0);
      if (this.parentOrderId > 0) {
        this.getParentOrderDetails();
      }
    });
  }

  private initVariables() {
    this.orderId = parseInt(this.activatedRoute.snapshot.paramMap.get('orderId'), 0);
    this.breadcrumbService.updateDynamicList(':orderId', this.orderId.toString());
    this.isEditMode = this.orderId > 0;
    this.priorityList = [
      { value: 'Normal', text: 'Normal' },
      { value: 'Medium', text: 'Medium' },
      { value: 'High', text: 'High' }
    ];
    this.albumTypeList = [
      { value: 'Book', text: 'Book' },
      { value: 'Flat', text: 'Flat' },
      { value: 'Other', text: 'Other' }
    ];
  }

  private getAllServices() {
    this.serviceService.getAllServices().subscribe((data) => {
      this.orderTypeList = data
        .filter((item) => item.type.toLowerCase() === 'parent');

      this.orderTypeList.map((item) => {
        item.child = data
          .filter((i) => i.type.toLowerCase() === item.name.toLowerCase());
      });
    });
  }

  private getOrderDetails() {
    if (this.orderId) {
      this.orderService.getOrder(this.orderId)
        .subscribe(
          (order) => {
            this.currentOrder = order;
            this.parentOrderId = order.parentOrderId;
            this.customerId = order.customerId;
            this.getCustomerDetails();
            this.bindFormData(order);
          },
          (error) => {
            this.errorService.showSomeThingWentWrongMessage();
          }
        );
    }
  }

  private getParentOrderDetails() {
    this.orderService.getOrder(this.parentOrderId).subscribe((parentOrder) => {
      this.customerId = parentOrder.customerId;
      this.getCustomerDetails();
      this.orderForm.patchValue({
        customerName: parentOrder.customerName,
        phone: parentOrder.phone,
        email: parentOrder.email,
        dueDate: new Date(parentOrder.dueDate),
      });
    });
  }

  private getCustomerDetails() {
    this.customerService.getCustomer(this.customerId).subscribe((data) => {
      this.customer = data;
    });
  }

  private bindFormData(order: Order) {
    this.orderForm.patchValue({
      customerName: order.customerName,
      phone: order.phone,
      email: order.email,
      type: order.type,
      subType: order.subType,
      size: order.size,
      quantity: order.quantity,
      priority: order.priority,
      dueDate: new Date(order.dueDate),
      notes: order.notes,
      albumType: order.value0,
      coverType: order.value1,
      bagType: order.value2,
    });

    this.pages = order.pages;
  }

  private addOrder(order: Order) {
    order.status = 'Created';
    this.orderService.createOrder(order)
      .subscribe((data) => {
        this.modalService.showNotification('New order created', 'Close');

        if (this.parentOrderId > 0) {
          this.router.navigateByUrl(`orders/${this.parentOrderId}`);
        } else {
          this.router.navigateByUrl(`orders/${data.id}`);
        }
      });
  }

  private updateOrder(order: Order) {
    order.id = this.currentOrder.id;
    order.status = this.currentOrder.status;
    this.orderService.updateOrder(order)
      .subscribe((data) => {
        this.modalService.showNotification('Order updated', 'Close');

        if (this.parentOrderId > 0) {
          this.router.navigateByUrl(`orders/${this.parentOrderId}`);
        } else {
          this.router.navigateByUrl(`orders/${data.id}`);
        }
      });
  }

  /* Public Methods */
  lookupCustomer() {
    const dialogConfig = this.modalService.setDialogConfig(true, false, '780px');
    this.dialog.open(CustomerLookupComponent, dialogConfig)
      .afterClosed().subscribe(customer => {
        if (customer) {
          this.customer = customer;
          this.canSetContactAsCustomer = true;
        }
      });
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

    this.pages.map((page) => {
      page.isSelected = false;
      return page;
    });

    const dialogConfig = this.modalService.setDialogConfig(true, true, '100%',
      { pages: this.pages, orderType: this.orderForm.value.subType }, 'order-page-details-dialog');
    this.dialog.open(OrderConfigurePagesComponent, dialogConfig)
      .afterClosed().subscribe(data => {
        if (data.save) {
          this.pages = data.data;
        }
      });
  }

  onTypeSelected(event, type) {
    if (event.isUserInput) {
      this.selectedType = type;
      this.orderForm.patchValue({
        subType: null
      });
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

  onSave() {
    this.isFormSubmitted = true;
    if (this.orderForm.invalid) { return; }

    const order = new Order(this.orderForm.value);
    order.customerId = this.customer.id;
    order.pages = this.pages;
    order.parentOrderId = this.parentOrderId > 0 ? this.parentOrderId : null;

    if (!this.isEditMode) {
      this.addOrder(order);
    } else {
      this.updateOrder(order);
    }
  }
}
