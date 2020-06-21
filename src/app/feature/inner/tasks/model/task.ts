export class Task {
  id: number;
  sequence: number;
  name: string;
  type: string;
  status: string;
  subStatus: string;
  description: string;
  assignedToDept: string;
  assignedToDeptTime: Date;
  assignedToFirstName: string;
  assignedToLastName: string;
  assignedToEmployeeTime: Date;
  assignedByFirstName: string;
  assignedByLastName: string;
  completedByEmpTime: Date;
  assignedToDeptId: number;
  orderId: number;
  notes: string;
}
