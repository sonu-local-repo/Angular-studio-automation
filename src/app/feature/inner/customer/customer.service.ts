import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerAPI } from '@shared/api-end-points/customer-api-endpoint';
import { ApiResponse } from '@shared/models/api-response.model';
import { Observable } from 'rxjs';
import { CustomerFilterParams } from './models/customer-filter-params.model';
import { Customer } from './models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient
  ) { }

  /* Public Methods */
  getAllCustomers(customerFilterParams: CustomerFilterParams): Observable<ApiResponse<Customer[]>> {
    return this.http.get<ApiResponse<Customer[]>>(CustomerAPI.getAllCustomersUrl(customerFilterParams));
  }

  getCustomer(customerId: number): Observable<Customer> {
    return this.http.get<Customer>(CustomerAPI.getCustomerUrl(customerId));
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(CustomerAPI.createCustomerUrl(), customer);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(CustomerAPI.updateCustomerUrl(customer.id), customer);
  }
}
