import { API_URL_DOMAIN } from '@shared/configs/globals';

export const ServiceAPI = {
    getAllServicesUrl() {
        return `${API_URL_DOMAIN}/service/service/all`;
    },
    createServiceURL() {
        return `${API_URL_DOMAIN}/service/service/create`;
    },
    updateServiceURL(serviceId: number) {
        return `${API_URL_DOMAIN}/service/service/update/${serviceId}`;
    }
};
