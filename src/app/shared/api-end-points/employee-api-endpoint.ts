import { API_URL_DOMAIN } from '../configs/globals';
import { EmployeeFilterParams } from 'app/feature/inner/employee/models/employee-filter-params.model';
import { EmployeeResponsibilityAssoc } from '../../feature/inner/employee/models/employee-responsibility-assoc';

export const EmployeeAPI = {
    createEmployeeUrl() {
        return `${API_URL_DOMAIN}/org/employee/create`;
    },
    updateEmployeeUrl(employeeId: number) {
        return `${API_URL_DOMAIN}/org/employee/${employeeId}`;
    },
    getEmployeeUrl(employeeId: number) {
        return `${API_URL_DOMAIN}/org/employee/id/${employeeId}`;
    },
    getAllEmployeesUrl(params: EmployeeFilterParams) {
        let uri = `${API_URL_DOMAIN}/org/employee/all/page`;
        let searchString = '';
        if (params !== null) {
            Object.keys(params).map(key => {
                searchString += `${key}=${params[key]}&`;
            });
        }
        uri = searchString.length > 0 ? uri + '?' + searchString : uri;
        uri = searchString.length > 0 ? uri.substring(0, uri.length - 1) : uri;
        // console.log(uri);
        return uri;
        // return `${API_URL_DOMAIN}/org/employee/all/page`
        //     + `?firstName=${params.firstName}&lastName=${params.lastName}`
        //     + `&page=${params.page}&size=${params.size}&sort=${params.sortBy}&direction=${params.sortDirection}`;
    },
    getEmployeeScreens(employeeId: number) {
        return `${API_URL_DOMAIN}/org/employee/${employeeId}/screenviews`;
    },
    associateResponsibilityUrl() {
        return `${API_URL_DOMAIN}/org/employee/assoc/responsibility`
    },
    deleteEmployeeResponsibilityAssociationUrl(employeeRes: EmployeeResponsibilityAssoc) {
        return `${API_URL_DOMAIN}/org/employee/${employeeRes.employeeId}/responsibility/${employeeRes.responsibilityId}`
    }
};
