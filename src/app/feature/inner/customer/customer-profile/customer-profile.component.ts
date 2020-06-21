import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '@shared/components/layout/breadcrumb/breadcrumb.service';
import { CustomerService } from '../customer.service';
import { Customer } from '../models/customer.model';
import { ErrorService } from '@shared/services/error.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {

  customerDetails: Customer;
  customerId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private breadcrumbService: BreadcrumbService,
    private errorService: ErrorService,
  ) { }

  /* Lifecycle Hooks */
  ngOnInit() {
    this.getCustomer();
    this.customerId = parseInt(this.activatedRoute.snapshot.paramMap.get('customerId'));
  }

  private getCustomer() {
    const customerId = parseInt(this.activatedRoute.snapshot.paramMap.get('customerId'), 0);

    if (isNaN(customerId)) {
      this.errorService.showSomeThingWentWrongMessage();
      return;
    }

    this.customerService.getCustomer(customerId)
      .subscribe(
        (data) => {
          this.customerDetails = data;
          this.breadcrumbService.updateDynamicList(':customerName', this.customerDetails.name);
        },
        (error) => {
          this.errorService.showSomeThingWentWrongMessage();
        }
      );
  }
}
