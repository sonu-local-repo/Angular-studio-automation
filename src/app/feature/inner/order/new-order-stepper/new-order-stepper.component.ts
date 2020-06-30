import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Order} from "../models/order";
import {CustomerLookupComponent} from "../../customer/customer-lookup/customer-lookup.component";
import {ModalService} from "@shared/services/modal.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Customer} from "../../customer/models/customer.model";
import {DropdownItem} from "@shared/models/dropdown-item.model";
import {OrderPage} from "../models/order-page.model";
import {Lov} from "@shared/models/lov-model";
import {SettingsService} from "../../settings/settings.service";
import {OrderConfigurePagesComponent} from "../order-configure-pages/order-configure-pages.component";
import {OrderService} from "../order.service";
import {OrderWorkflowComponent} from "../order-workflow/order-workflow.component";
import {Router} from "@angular/router";
import {OrderEffectsComponent} from "../order-effects/order-effects.component";
import {OrderPageDetails} from "../models/order-page-details.model";
import {ActionService} from "@shared/services/action.service";

@Component({
  selector: 'app-new-order-stepper',
  templateUrl: './new-order-stepper.component.html',
  styleUrls: ['./new-order-stepper.component.scss']
})
export class NewOrderStepperComponent implements OnInit {

  @ViewChild('searchRef', { static: true }) searchRef: ElementRef;
  orderForm: FormGroup;
  orderTypeList: DropdownItem[] = [];
  priorityList: DropdownItem[] = [];
  albumTypeList: DropdownItem[] = [];
  coverTypeList: DropdownItem[] = [];
  bagTypeList: DropdownItem[] = [];
  colorList: DropdownItem[] = [];
  porpertyList = [];
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
  orderType: string;
  updateCounter = 0;
  highlitedPages: any;
  highlitedPageNumbers: number[] = [];
  selectedProperty: any;
  dataFormGroup: FormGroup;
  applyFormGroup: FormGroup;
  defaultPageCount = 1;
  disableButton = false;
  effectsList = [];
  pageCount = 1;
  pageNumbersLine: string;
  effects = null;
  historyPages: OrderPage[] = [];
  selectUnappliedInActive = false;


  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private dialog: MatDialog,
    private settingsService: SettingsService,
    private orderService: OrderService,
    private matDialogRef: MatDialogRef<OrderWorkflowComponent>,
    private router: Router,
    private actionService: ActionService,
  ) { }

  ngOnInit() {
    this.initVariables();
    this.buildForm();
    this.buildConfigurationForm();

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
      dueDate: new FormControl(new Date(),
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

  private initVariables() {
    this.settingsService.getListofValues().subscribe(data => {
      this.lovData = data;


        this.lovData.filter((item) =>
          item.type === 'ORDER_SUB_TYPE' && item.status === 'Active')
          .map(val => {
            this.subtype.push(val.value.trim());

          });


      data.filter((item) => item.type === 'ORDER_PRIORITY' && item.status === 'Active').map(val => {
        this.priorityList.push({
          value: val.value,
          text: val.value
        });
      });

      data.filter((item) => item.type === 'ALBUM_PAGE' && item.subType === '' && item.status === 'Active').map(val => {
        this.porpertyList.push({
          value: val.value,
          text: val.value
        });
      });
      data.filter((item) => item.type === 'ALBUM_PAGE' && item.subType === 'Effects' && item.status === 'Active').map(val => {
        this.effectsList.push({
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
  onTypeSelected(event, type) {
    if (event.isUserInput) {
      this.selectedType = type;
    }
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
      // order.id = this.inputData.orderObject.id;
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
  invalidForm(step: string) {
    return this.orderForm.status === 'INVALID' ? true : false;
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
        // order.id = this.inputData.orderObject.id;
        // order.status = this.orderStatus === 'Draft' ? 'Created' : this.inputData.orderObject.status;
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
            // const opParentOrderId = this.inputData.orderId ? this.parentOrderId : data.id;
            const opParentOrderId =  data.id;
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


  private buildConfigurationForm() {
    this.applyFormGroup = new FormGroup({
      type: new FormControl('Effects'),
      value: new FormControl(null),
    });

    this.dataFormGroup = new FormGroup({
      pageCount: new FormControl(this.defaultPageCount, [Validators.required, Validators.minLength(1), Validators.min(1)]),
    });
  }
  onPageCountChange(count: number, $event = null) {

    this.updatePageChanges(count);

    // const key = String.fromCharCode($event.keyCode);
    // if (this.updateCounter > 0 && /[a-zA-Z0-9]/.test(key)) {
    //   const confirm = {
    //     question: 'Updating page numbers will overwrite unsaved changes. Do you want to continue?',
    //     yes: 'Yes',
    //     no: 'No'
    //   };
    //   const dialogConfig = this.modalService.setDialogConfig(true, false, '700px', confirm);
    //   this.dialog.open(ConfirmModalComponent, dialogConfig)
    //     .afterClosed().subscribe(flag => {
    //       if (!flag) {
    //         this.dataFormGroup.setValue({ "pageCount": this.pageCount });
    //         return;
    //       } else {
    //         this.updatePageChanges(count);
    //       }
    //     });
    // } else {
    //   this.updatePageChanges(count);
    // }
  }

  updatePageChanges(pageCount: number) {
    this.disableButton = this.dataFormGroup.valid ? false : true;
    if (pageCount < 1) {
      this.dataFormGroup.markAsTouched();
      return;
    }
    if (this.pages.length === 0) {
      /* Add all pages */
      this.pages = [];
      for (let i = 1; i <= pageCount; i++) {
        const page = new OrderPage();
        page.pageNo = i;
        page.comments = '';
        page.type = this.orderType;
        page.pageDetails = [];
        page.isSelected = false;
        this.pages.push(page);
      }
    } else if (this.pages.length > pageCount) {
      /* Remove additional pages */
      this.pages = this.pages.slice(0, pageCount);
    } else if (this.pages.length < pageCount) {
      /* Add additional pages */
      for (let i = this.pages.length + 1; i <= pageCount; i++) {
        const page = new OrderPage();
        page.pageNo = i;
        page.comments = '';
        page.type = this.orderType;
        page.pageDetails = [];
        page.isSelected = false;
        this.pages.push(page);
      }
    }
    this.updateCounter++;
  }
  changeEvent(currentValue) {
    this.pageCount = currentValue;
  }

  selectAll() {
    this.pages = this.pages.map((i) => {
      i.isSelected = true;
      return i;
    });

    this.highlitedPages = this.pages.filter((i) => i.isSelected === true);
    this.highlitedPageNumbers = this.highlitedPages.map((i) => i.pageNo);
    this.setSelectedPageInOneLine();
  }

  private setSelectedPageInOneLine() {
    this.pageNumbersLine = '';
    const result = this.highlitedPageNumbers.reduce((r, n) => {
      const lastSubArray = r[r.length - 1];
      if (!lastSubArray || lastSubArray[lastSubArray.length - 1] !== n - 1) {
        r.push([]);
      }
      r[r.length - 1].push(n);
      return r;
    }, []);
    result.map((group) => {
      if (group.length === 1) {
        this.pageNumbersLine = this.pageNumbersLine + `${group[0]}, `;
      } else {
        this.pageNumbersLine = this.pageNumbersLine + `${group[0]} - ${group[group.length - 1]}, `;
      }
    });
    this.pageNumbersLine = this.pageNumbersLine.replace(/,\s*$/, '');
    // this.pageNumbersLine = Array.from(this.pageNumbersLine.split(',').reduce((m, t) => m.set(t, t), new Map()).values()).join(',');
  }
  clearSelection() {
    this.resetSelectedPages();
    this.highlitedPages = [];
    this.highlitedPageNumbers = [];
    this.pageNumbersLine = '';
  }

  private resetSelectedPages() {
    this.pages = this.pages.map((i) => {
      i.isSelected = false;
      return i;
    });
  }

  onPropertySelected(event, type) {
    if (event.isUserInput) {
      this.selectedProperty = type;
    }
    this.applyFormGroup.patchValue({
      value: null,
    });
  }

  onLovApply() {
    const dialogConfig = this.modalService.setDialogConfig(true, true, '100%');
    const dialogRef = this.dialog.open(OrderEffectsComponent, dialogConfig)
      .afterClosed().subscribe(data => {
        if (data.save) {
          // this.saveError = '';
          // this.pages = data.data;
          // this.allowsubmit = this.pages.length > 1 ? true : false;
          this.effects=data.data;
          this.applyFormGroup.value.value = data.data;

          // console.log(this.applyFormGroup)
          dialogRef.unsubscribe();
        }
      });
  }

  onLovUnApply() {
    this.effects=null;
  }
  onUndo() {
    this.pages = this.historyPages;
    this.resetSelectedPages();
    this.historyPages = [];
    this.highlitedPageNumbers = [];
    this.pageNumbersLine = '';
  }

  onApply() {
    const type = this.applyFormGroup.value.type;
    const value = this.applyFormGroup.value.value;
    this.historyPages = this.actionService.deepCopy(this.pages);
    this.highlitedPageNumbers.map((num) => {
      const pageIndex = this.pages
        .findIndex((page) => page.pageNo === num);

      const pageDetailsIndex = this.pages[pageIndex].pageDetails
        .findIndex((detail) => detail.type === type);

      const pageDetails = new OrderPageDetails();
      pageDetails.type = type;
      pageDetails.value = value;

      if (pageDetailsIndex === -1) {
        this.pages[pageIndex].pageDetails.push(pageDetails);
      } else {
        this.pages[pageIndex].pageDetails[pageDetailsIndex] = pageDetails;
      }
    });


    this.setUnappliedButtonInactive();
    this.applyFormGroup.patchValue({ value: null });
    this.updateCounter++;
    this.clearSelection();

  }
  removePropertyFromPage(data: any) {
    const pageIndex = this.pages
      .findIndex((page) => page.pageNo === data.task.pageNo);

    this.pages[pageIndex].pageDetails = this.pages[pageIndex].pageDetails
      .filter((detail) => {
        return detail.type !== data.task.type
          || (detail.type === data.task.type && detail.value !== data.task.value);
      });
    this.setUnappliedButtonInactive();
    this.updateCounter++;
  }

  trackByFn(index, item) {
    return index;
  }

  getToolTip(page: OrderPage) {
    if (page.pageDetails.length === 0) {
      return;
    } else {
      let text = '';
      page.pageDetails.map((detail) => {
        text = text + `${detail.type} - ${detail.value}, `;
      });
      return text.replace(/,\s*$/, '');
    }
  }

  setUnappliedButtonInactive() {
    if (this.pages.filter(item => item.pageDetails.length > 0).length === this.pages.length) {
      this.selectUnappliedInActive = true;
    } else {
      this.selectUnappliedInActive = false;
    }
  }

  togglePageSelection(page: OrderPage, event) {
    if (this.highlitedPages.includes(page)) {
      this.highlitedPages = this.highlitedPages.filter(ol => ol.pageNo !== page.pageNo);
    } else {
      this.highlitedPages.push(page);
    }
    if (event.shiftKey) {
      this.doSequentialSelection(page);
    }
    let index = this.pages.findIndex((i) => i.pageNo === page.pageNo);
    page.isSelected = !page.isSelected;
    this.pages[index] = page;
    // logic to select previous page when an odd number is selected
    if (page.isSelected) {
      if (this.actionService.isEvenNumber(page.pageNo)) {
        index++;
        const nextPage = this.pages[index];
        if (!nextPage) {
          this.highlitedPages = this.pages.filter((i) => i.isSelected === true);
          this.highlitedPageNumbers = this.highlitedPages.map((i) => i.pageNo);
          this.setSelectedPageInOneLine();
          return;
        }
        nextPage.isSelected = true;
        this.pages[index] = nextPage;
        this.highlitedPages.push(nextPage);
      } else {
        if (index !== 0) {
          index--;
        }
        const prevPage = this.pages[index];
        if (!prevPage) { return; }
        prevPage.isSelected = true;
        this.pages[index] = prevPage;
        this.highlitedPages.push(prevPage);
      }
    }
    this.highlitedPages = this.pages.filter((i) => i.isSelected === true);
    this.highlitedPageNumbers = this.highlitedPages.map((i) => i.pageNo);
    this.setSelectedPageInOneLine();
  }
  private doSequentialSelection(page: OrderPage) {
    if (page.isSelected === false) {
      const lesser = this.highlitedPageNumbers.filter((item) => {
        return item < page.pageNo;
      });
      const prevHighlitedPageNumber = Math.max(...lesser);
      this.pages.map((i) => {
        if (i.pageNo > prevHighlitedPageNumber && i.pageNo < page.pageNo) {
          i.isSelected = true;
        }
      });
      this.highlitedPages = this.pages.filter((i) => i.isSelected === true);
      this.highlitedPageNumbers = this.highlitedPages.map((i) => i.pageNo);
      this.setSelectedPageInOneLine();
    }
  }
  isPageSelected(pageNo: number) {
    if (this.highlitedPages.findIndex((i) => i.pageNo === pageNo) > -1) {
      return 'selected';
    } else {
      return 'un-selected';
    }
  }
  onCancel() {
    // this.dialogRef.close({ save: false });
  }
  selectRemaining() {
    this.highlitedPages = this.pages.filter((i) => i.pageDetails.length === 0);
    // console.log(this.highlitedPages);
    this.highlitedPageNumbers = this.highlitedPages.map((i) => i.pageNo);
    this.setSelectedPageInOneLine();
  }

}
