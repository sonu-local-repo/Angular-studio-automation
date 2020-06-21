import { API_URL_DOMAIN } from '../configs/globals';
import { CustomerFilterParams } from 'app/feature/inner/customer/models/customer-filter-params.model';

export const CustomerAPI = {
    createCustomerUrl() {
        return `${API_URL_DOMAIN}/order-details/order/customer/create`;
    },
    updateCustomerUrl(customerId: number) {
        return `${API_URL_DOMAIN}/order-details/order/customer/update/${customerId}`;
    },
    getCustomerUrl(customerId: number) {
        return `${API_URL_DOMAIN}/order-details/order/customer/${customerId}`;
    },
    getAllCustomersUrl(params: CustomerFilterParams) {
        return `${API_URL_DOMAIN}/order-details/order/customer/pages`
            + `?name=${params.name}&mobile=${params.mobile}`
            + `&page=${params.page}&size=${params.size}&sort=${params.sortBy}&direction=${params.sortDirection}`;
    },
};
