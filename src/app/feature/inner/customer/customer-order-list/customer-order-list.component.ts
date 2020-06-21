import { Router } from '@angular/router';
import { CustomerOrderFilter } from '../models/customer-order-filter-params.model';
import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Order } from '../../order/models/order';
import { OrderService } from '../../order/order.service';
import { startWith, switchMap, map, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { of as observableOf, fromEvent } from 'rxjs';

@Component({
  selector: 'app-customer-order-list',
  templateUrl: './customer-order-list.component.html',
  styleUrls: ['./customer-order-list.component.scss']
})
export class CustomerOrderListComponent implements OnInit, AfterViewInit {

  orderList: MatTableDataSource<Order> = new MatTableDataSource([]);
  displayedColumns: string[] = ['id', 'type', 'customerName', 'status', 'dueDate', 'phone', 'priority', 'createdAt', 'actions'];
  // screenName = ScreenName;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('searchRef', { static: true }) searchRef: ElementRef;
  @Input() customerId: number;
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.getOrders('');

  }

  ngAfterViewInit() {

    // fromEvent<any>(this.searchRef.nativeElement, 'keyup')
    //   .pipe(
    //     map(event => event.target.value),
    //     debounceTime(300),
    //     distinctUntilChanged(),
    //     switchMap(searchParam => {
    //       return this.fetchOrderDetails(searchParam);
    //     })
    //   ).subscribe(data => {
    //     this.orderList.data = data.content;
    //     this.length = data.totalElements;
    //   });
  }

  getOrders(searchSt: string) {

    this.fetchOrderDetails(searchSt).subscribe(data => {
      this.orderList.data = data.content;
      this.length = data.totalElements;
    });
  }
  private fetchOrderDetails(searchParam: string) {
    const customerOrderFilter = new CustomerOrderFilter();
    customerOrderFilter.searchString = searchParam;
    customerOrderFilter.sortBy = 'customerName';
    customerOrderFilter.sortDirection = 'desc';

    customerOrderFilter.page = this.paginator === undefined ? 0 : this.paginator.pageIndex;
    customerOrderFilter.size = this.paginator === undefined ? this.pageSize : this.paginator.pageSize;
    return this.orderService.getAllCustomerOrders(customerOrderFilter, this.customerId);

  }

  navigateTo(id: number) {
    // console.log('navigate' + id);
    this.router.navigateByUrl(`orders/${id}`);
  }


}
