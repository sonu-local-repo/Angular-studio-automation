import { API_URL_DOMAIN } from '@shared/configs/globals';

export const TaskAPI = {
  getTaskByEmployeeUrl() {
    return `${API_URL_DOMAIN}/order-task/employee`;
  },
  getTaskByDepartmentUrl() {
    return `${API_URL_DOMAIN}/order-task/department`;
  },
  getTaskEmployeeUrl(id: number) {
    return `${API_URL_DOMAIN}/org/employee/department/${id}`;
  },
  assignTaskToEmployee(id: number) {
    return `${API_URL_DOMAIN}/order-task/assign/${id}`;
  },
  completeTaskUrl(id: number) {
    return `${API_URL_DOMAIN}/order-task/complete/${id}`;
  },
  uploadFile(id: number) {
    return `${API_URL_DOMAIN}/order-details/order/${id}/attachment`;
  }
};


