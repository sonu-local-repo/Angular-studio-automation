import { API_URL_DOMAIN } from '@shared/configs/globals';

export const LOVAPI = {
    getAlllovUrl() {
        return `${API_URL_DOMAIN}/lov/list`;
    },
    createLovUrl() {
        return `${API_URL_DOMAIN}/lov/create`;
    },
    updateLovUrl(id: number) {
        return `${API_URL_DOMAIN}/lov/update/${id}`;
    }
};
