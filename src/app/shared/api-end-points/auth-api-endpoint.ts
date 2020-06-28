import { API_URL_DOMAIN } from '@shared/configs/globals';

export const AuthAPI = {
    validateUserUrl() {
        return `${API_URL_DOMAIN}/authenticate`;
    },

    getEmployeeAuthoritiesUrl() {
        return `${API_URL_DOMAIN}/org/employee/authorities`;
    },
  getEmployeePermissionsUrl() {
    return `${API_URL_DOMAIN}/org/employee/authoritiesList`;
  },
};
