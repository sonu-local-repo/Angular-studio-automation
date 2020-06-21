import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ActionService } from '@shared/services/action.service';
import { OrderPageDetails } from '../models/order-page-details.model';
import { OrderPage } from '../models/order-page.model';
import { ModalService } from '@shared/services/modal.service';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { SettingsService } from '../../settings/settings.service';
import {OrderEffectsComponent} from "../order-effects/order-effects.component";

@Component({
  selector: 'app-order-configure-pages',
  templateUrl: './order-configure-pages.component.html',
  styleUrls: ['./order-configure-pages.component.scss']
})
export class OrderConfigurePagesComponent implements OnInit {

  effects = null;
  isEditMode = false;
  applyFormGroup: FormGroup;
  dataFormGroup: FormGroup;
  pages: OrderPage[] = [];
  orderType: string;
  historyPages: OrderPage[] = [];
  highlitedPageNumbers: number[] = [];
  pagesGroupedByType: any = [];
  pageNumbersLine: string;
  porpertyList = [];
  selectedProperty: any;
  defaultPageCount = 1;
  updateCounter = 0;
  highlitedPages: any;
  disableButton = false;
  pageCount = 1;
  selectUnappliedInActive = false;
  effectsList = [];
  constructor(
    private actionService: ActionService,
    private dialogRef: MatDialogRef<OrderConfigurePagesComponent>,
    private modalService: ModalService,
    private dialog: MatDialog,
    private settingsService: SettingsService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.orderType = data.orderType;
    if (data.pages) {
      if (data.pages.length > 0) {
        this.pages = data.pages;
      }
      this.isEditMode = this.pages.length > 0;
    }

  }

  /* Lifecycle Hooks */
  ngOnInit() {
    this.highlitedPages = [];
    this.initVariables();
    this.buildForm();
    this.bindFormData();
  }

  /* Private Methods */
  private initVariables() {
    let lovData = [];
    this.settingsService.getListofValues().subscribe(data => {
      lovData = data;
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
    });
  }

  private buildForm() {
    this.applyFormGroup = new FormGroup({
      type: new FormControl('Effects'),
      value: new FormControl(null),
    });

    this.dataFormGroup = new FormGroup({
      pageCount: new FormControl(this.defaultPageCount, [Validators.required, Validators.minLength(1), Validators.min(1)]),
    });
  }

  private bindFormData() {
    if (this.isEditMode) {
      this.setUnappliedButtonInactive();
      this.dataFormGroup.patchValue({
        pageCount: this.pages.length,
      });
    } else {
      this.onPageCountChange(this.defaultPageCount);
    }
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

  private resetSelectedPages() {
    this.pages = this.pages.map((i) => {
      i.isSelected = false;
      return i;
    });
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

  /* Public Methods */
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

  selectAll() {
    this.pages = this.pages.map((i) => {
      i.isSelected = true;
      return i;
    });

    this.highlitedPages = this.pages.filter((i) => i.isSelected === true);
    this.highlitedPageNumbers = this.highlitedPages.map((i) => i.pageNo);
    this.setSelectedPageInOneLine();
  }

  isPageSelected(pageNo: number) {
    if (this.highlitedPages.findIndex((i) => i.pageNo === pageNo) > -1) {
      return 'selected';
    } else {
      return 'un-selected';
    }
  }

  selectRemaining() {
    this.highlitedPages = this.pages.filter((i) => i.pageDetails.length === 0);
    // console.log(this.highlitedPages);
    this.highlitedPageNumbers = this.highlitedPages.map((i) => i.pageNo);
    this.setSelectedPageInOneLine();
  }

  clearSelection() {
    this.resetSelectedPages();
    this.highlitedPages = [];
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

  setUnappliedButtonInactive() {
    if (this.pages.filter(item => item.pageDetails.length > 0).length === this.pages.length) {
      this.selectUnappliedInActive = true;
    } else {
      this.selectUnappliedInActive = false;
    }
  }

  onPropertySelected(event, type) {
    if (event.isUserInput) {
      this.selectedProperty = type;
    }
    this.applyFormGroup.patchValue({
      value: null,
    });
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

  onUndo() {
    this.pages = this.historyPages;
    this.resetSelectedPages();
    this.historyPages = [];
    this.highlitedPageNumbers = [];
    this.pageNumbersLine = '';
  }

  onSave() {
    this.dialogRef.close({ save: true, data: this.pages });
  }

  onCancel() {
    this.dialogRef.close({ save: false });
  }

  changeEvent(currentValue) {
    this.pageCount = currentValue;
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
}
