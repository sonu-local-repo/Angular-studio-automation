import { Employee } from '../../employee/models/employee.model';

export class TaskDeptModel {
  id: number;
  name: string;
  status: string;
  employees?: Employee[];
  // id: number;
  // sequence: number;
  // name: string;
  // type: string;
  // status: string;
  // subStatus: string;
  // description: string;
  // assignedToDept: string;
  // assignedToDeptTime: string;
  // assignedToFirstName: string;
  // assignedToLastName: string;
  // assignedToEmployeeTime: string;
  // assignedByFirstName: string;
  // assignedByLastName: string;
  // completedByEmpTime: string;
  // assignedToDeptId: number;
  // orderId: number;
}
