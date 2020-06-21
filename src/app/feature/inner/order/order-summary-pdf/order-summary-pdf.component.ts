import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../models/order';
import { map } from 'rxjs/operators';
import { CustomerService } from '../../customer/customer.service';
import { Customer } from '../../customer/models/customer.model';
import { ActionService } from '@shared/services/action.service';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-order-summary-pdf',
  templateUrl: './order-summary-pdf.component.html',
  styleUrls: ['./order-summary-pdf.component.scss']
})
export class OrderSummaryPdfComponent implements OnInit {
  @Input() orderId: number;
  orders: any[];
  customerId: number;
  customer: Customer;
  pages: any[];
  pagesGroupedByType: any = [];
  isReadonly = true;
  itemizedPages = [];
  parentOrderId = 0;
  orderCreatedDate = '';

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    private actionService: ActionService
  ) { }

  ngOnInit() {
    // console.log(this.orderId);
    this.getOrderDetails();
  }

  private getOrderDetails() {
    if (this.orderId) {
      this.orderService.getOrder(this.orderId).pipe(
        map((order: Order) => {
          this.customerId = order.customerId;
          // console.log(order);
          this.orders = [order];
          this.parentOrderId = order.id;
          this.orderCreatedDate = order.createdAt;
          this.pages = [order.pages];
          this.itemizedPages.push({
            orderId: this.orderId,
            list: this.setPageTask(order.pages)
          });
          return order.customerId;
        }),
        // mergeMap((customerId: number) => this.customerService.getCustomer(customerId)),
      ).subscribe(res => {
        // console.log(this.pagesGroupedByType);
        this.getCustomerAndRelatedOrders(this.orderId, this.customerId);
        this.processList(this.itemizedPages);
      });
    }
  }
  getCustomerAndRelatedOrders(orderId: number, customerId) {
    forkJoin(this.customerService.getCustomer(customerId),
      this.orderService.getRelatedOrders(orderId))
      .subscribe(([customer, relatedOrder]) => {
        relatedOrder.map((item) => {
          this.orders.push(item);
          this.pages.push(item.pages);
          this.itemizedPages.push({
            orderId: item.id,
            list: this.setPageTask(item.pages)
          });
        });
        this.customer = customer;

      });
  }

  processList(pagesGroup) {
    pagesGroup.map(item => {
      if (item.list.length > 0) {
        // console.log(item.list);
      }
    });
  }
  private setPageTask(pages) {
    let tags = [];

    pages.map((page) => {
      if (page.pageDetails.length > 0) {
        const pageDetails = page.pageDetails;
        pageDetails.map((detail) => { detail.pageNo = page.pageNo; });
        tags = tags.concat(pageDetails);
      }
    });

    const mainList = this.actionService.groupBy(tags, 'type');
    const refinedMainList = [];

    for (const mainProp in mainList) {
      if (Object.prototype.hasOwnProperty.call(mainList, mainProp)) {
        const childList = this.actionService.groupBy(mainList[mainProp], 'value');
        const refinedChild = [];
        for (const childProp in childList) {
          if (Object.prototype.hasOwnProperty.call(childList, childProp)) {
            refinedChild.push({ type: childProp, child: childList[childProp] });
          }
        }
        refinedMainList.push({ type: mainProp, child: refinedChild });
      }
    }

    if (this.isReadonly) {
      refinedMainList.map((main) => {
        main.child.map((sub) => {
          sub.child = sub.child.map((inner) => inner.pageNo);
          sub.child = this.setSelectedPageInOneLine(sub.child);
        });
      });
    }


    this.pagesGroupedByType = refinedMainList;
    return refinedMainList;
  }

  private setSelectedPageInOneLine(list) {
    let pageNumbersLine = '';
    const result = list.reduce((r, n) => {
      const lastSubArray = r[r.length - 1];

      if (!lastSubArray || lastSubArray[lastSubArray.length - 1] !== n - 1) {
        r.push([]);
      }

      r[r.length - 1].push(n);

      return r;
    }, []);
    // console.log(result);
    result.map((group) => {
      if (group.length === 1) {
        pageNumbersLine = pageNumbersLine + `${group[0]}, `;
      } else {
        pageNumbersLine = pageNumbersLine + `${group[0]} - ${group[group.length - 1]}, `;
      }
    });
    return pageNumbersLine.replace(/,\s*$/, '');
  }
}
