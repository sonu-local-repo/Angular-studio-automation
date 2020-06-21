import { API_URL_DOMAIN } from '@shared/configs/globals';

export const ScreenAPI = {
    createScreenViewUrl() {
        return `${API_URL_DOMAIN}/screens/view/create`;
    },
    updateScreenViewUrl(viewId: number) {
        return `${API_URL_DOMAIN}/screens/view/update/${viewId}`;
    },
    getAllScreensUrl() {
        return `${API_URL_DOMAIN}/screens/views/all`;
    },
    associateEmployeeViewUrl() {
        return `${API_URL_DOMAIN}/screens/employee/view/assoc`;
    },
    updateEmployeeViewUrl(viewId: number) {
        return `${API_URL_DOMAIN}/screens/employee/view/assoc/${viewId}`;
    },
};
