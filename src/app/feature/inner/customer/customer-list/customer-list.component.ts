import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ModalService } from '@shared/services/modal.service';
import { CustomerAddEditComponent } from '../customer-add-edit/customer-add-edit.component';
import { CustomerService } from '../customer.service';
import {PermissionService} from "@core/services/permission.service";
import {ScreenName} from "@shared/enums/screen-name.enum";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  searchCounter = 0;
  searchForm: FormGroup;
  screenName= ScreenName;

  constructor(
    private permissionService: PermissionService,
    private customerService: CustomerService,
    private dialog: MatDialog,
    private modalService: ModalService) { }

  /* Lifecycle Hooks */
  ngOnInit() {
    this.buildForm();
  }

  /* Private Methods */
  private buildForm() {
    this.searchForm = new FormGroup({
      name: new FormControl(''),
      mobile: new FormControl(''),
    });
  }

  /* Public Methods */
  onSearch() {
    if (this.searchForm.value.name !== '' || this.searchForm.value.mobile !== '') {
      this.searchCounter++;
    }
  }

  onClearSearch(field: string) {
    switch (field) {
      case 'name':
        this.searchForm.patchValue({ name: '' });
        break;
      case 'mobile':
        this.searchForm.patchValue({ mobile: '' });
        break;
      default:
        this.searchForm.patchValue({ name: '', mobile: '', });
        this.searchCounter = 0;
        break;
    }

    if (this.searchCounter > 0) {
      this.searchCounter--;
    }
  }

  addNewCustomer() {
    const dialogConfig = this.modalService.setDialogConfig(true, true, '780px');
    this.dialog.open(CustomerAddEditComponent, dialogConfig)
      .afterClosed().subscribe(reload => {
        if (reload) {
          this.searchCounter++;
        }
      });
  }
}
