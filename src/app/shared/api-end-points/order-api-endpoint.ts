import { CustomerOrderFilter } from '../../feature/inner/customer/models/customer-order-filter-params.model';
import { OrderFilterParams } from 'app/feature/inner/order/models/order-filter-params.model';
import { API_URL_DOMAIN } from '../configs/globals';

export const OrderAPI = {
  updateAndAssignOrder(id: number) {
    return `${API_URL_DOMAIN}/order-details/order/order/assign/${id}`;
  },
  createOrderUrl() {
    return `${API_URL_DOMAIN}/order-details/order/order/create`;
  },
  updateOrderUrl(orderId: number) {
    return `${API_URL_DOMAIN}/order-details/order/order/update/${orderId}`;
  },
  getOrderUrl(orderId: number) {
    return `${API_URL_DOMAIN}/order-details/order/order/${orderId}`;
  },
  getAllCustomerOrdersUrl(params: CustomerOrderFilter, customerId: number) {
    return `${API_URL_DOMAIN}/order-details/customer/${customerId}/pages`
      + `?searchString=${params.searchString}`
      + `&page=${params.page}&size=${params.size}&sort=${params.sortBy}&direction=${params.sortDirection}`;
  },
  getAllOrdersUrl(params: OrderFilterParams) {
    let uri = `${API_URL_DOMAIN}/order-details/order/order/pages`;
    let searchString = '';
    Object.keys(params).map(key => {
      searchString += `${key}=${encodeURIComponent(params[key])}&`;
    });
    uri = searchString.length > 0 ? uri + '?' + searchString : uri;
    uri = searchString.length > 0 ? uri.substring(0, uri.length - 1) : uri;
    return uri;
    //DEEPAK: Commented the below code to append parameters only if passed in input
    // return `${API_URL_DOMAIN}/order-details/order/order/pages`
    //   + `?custname=${params.custName}&email=${params.email}&phone=${params.phone}`
    //   + `&present=${params.present}&priority=${params.priority}&status=${params.status}`
    //   + `&page=${params.page}&size=${params.size}&sort=${params.sortBy}&direction=${params.sortDirection}`;
  },
  getRelatedOrdersUrl(orderId: number) {
    return `${API_URL_DOMAIN}/order-details/order/${orderId}/relatedOrder`;
  },
  getOrderTasks(orderId: number) {
    return `${API_URL_DOMAIN}/order-task/all/${orderId}`;
  },
  getAttachments(orderId: number) {
    return `${API_URL_DOMAIN}/order-details/order/${orderId}/attachment`;
  },
  viewAttachment(id: number) {
    return `${API_URL_DOMAIN}/order-details/order/attachment/${id}`;

  }
};
