import {API_URL_DOMAIN} from "@shared/configs/globals";

export const DepartmentApi = {
  getAllDepartmentsUrl() {
    return `${API_URL_DOMAIN}/department/all`;
  },
};
