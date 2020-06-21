import { CustomerOrderFilter } from './../customer/models/customer-order-filter-params.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderAPI } from '@shared/api-end-points/order-api-endpoint';
import { ApiResponse } from '@shared/models/api-response.model';
import { Observable } from 'rxjs';
import { Order } from './models/order';
import { OrderFilterParams } from './models/order-filter-params.model';
import { Attachment } from './models/attachment';
import { Task } from '../tasks/model/task';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  /* Public Methods */
  getAllCustomerOrders(customerOrderFilter: CustomerOrderFilter, customerId: number): Observable<ApiResponse<Order[]>> {
    return this.http.get<ApiResponse<Order[]>>(OrderAPI.getAllCustomerOrdersUrl(customerOrderFilter, customerId));
  }
  assignAndProcessOrder(id: number) {
    return this.http.put(OrderAPI.updateAndAssignOrder(id), id);
  }

  getAllOrders(orderFilterParams: OrderFilterParams): Observable<ApiResponse<Order[]>> {
    return this.http.get<ApiResponse<Order[]>>(OrderAPI.getAllOrdersUrl(orderFilterParams));
  }

  getOrder(orderId: number): Observable<Order> {
    return this.http.get<Order>(OrderAPI.getOrderUrl(orderId));
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(OrderAPI.createOrderUrl(), order);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(OrderAPI.updateOrderUrl(order.id), order);
  }

  getRelatedOrders(orderId: number): Observable<Order[]> {
    return this.http.get<Order[]>(OrderAPI.getRelatedOrdersUrl(orderId));
  }
  getAllOrderTasks(orderId: number): Observable<Task[]> {
    return this.http.get<Task[]>(OrderAPI.getOrderTasks(orderId));
  }
  getAllAttachments(orderId: number): Observable<Attachment[]> {
    return this.http.get<Attachment[]>(OrderAPI.getAttachments(orderId));
  }

  viewAttachment(id: number) {
    const url = OrderAPI.viewAttachment(id);
    const httpOptions = {
      // 'responseType'  : 'arraybuffer' as 'json'
      responseType: 'blob' as 'json'        //This also worked
    };

    return this.http.get<any>(url, httpOptions);
    // return this.http.get<any[]>(OrderAPI.viewAttachment(id));

  }
}
