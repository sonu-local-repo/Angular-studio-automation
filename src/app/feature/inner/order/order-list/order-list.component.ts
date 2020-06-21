import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderWorkflowComponent } from '../order-workflow/order-workflow.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit, AfterViewInit {
  searchCounter = 0;
  searchForm: FormGroup;
  @ViewChild('searchRef', { static: true }) searchRef: ElementRef;

  constructor(
    private router: Router,
    private matDialog: MatDialog
  ) { }

  /* Lifecycle Hooks */
  ngOnInit() {
    this.buildForm();
  }

  /* Private Methods */
  private buildForm() {
    this.searchForm = new FormGroup({
      custName: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
    });
  }

  /* Public Methods */
  onSearch() {

    if (this.searchForm.value.custName !== ''
      || this.searchForm.value.phone !== ''
      || this.searchForm.value.email !== '') {
      this.searchCounter++;
    }
  }

  onClearSearch(field: string) {
    switch (field) {
      case 'custName':
        this.searchForm.patchValue({ custName: '' });
        break;
      case 'phone':
        this.searchForm.patchValue({ phone: '' });
        break;
      case 'email':
        this.searchForm.patchValue({ email: '' });
        break;
      default:
        this.searchForm.patchValue({ custName: '', phone: '', email: '', });
        this.searchCounter = 0;
        break;
    }

    if (this.searchCounter > 0) {
      this.searchCounter--;
    }
  }

  addNewOrder() {
    this.router.navigateByUrl(`orders/new`);
  }

  createNewOrder(parentOrderId: number = null, orderCustomerId: number = null, childOrder: boolean, coupleName, color) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.width = '60%';
    matDialogConfig.autoFocus = true;
    matDialogConfig.disableClose = true;
    matDialogConfig.panelClass = 'my-dialog';
    // tslint:disable-next-line:object-literal-shorthand
    matDialogConfig.data = {
      orderId: parentOrderId,
      customerId: orderCustomerId,
      childOrder: childOrder,
      coupleName: coupleName,
      color: color
    };
    console.log(matDialogConfig.data);
    const dialogRef = this.matDialog.open(OrderWorkflowComponent, matDialogConfig);
    const subscription = dialogRef.afterClosed().subscribe(data => {
      if (data.createNewOrder) {
        this.createNewOrder(data.orderId, data.customerId, data.createNewOrder, data.coupleName, data.color);
        subscription.unsubscribe();
      }
    });
  }

  ngAfterViewInit(): void {
    fromEvent<any>(this.searchRef.nativeElement, 'keyup')
      .subscribe(data => {
        if (this.searchForm.value.custName === '') {
          this.onClearSearch(null);
        }
      });
  }
}
