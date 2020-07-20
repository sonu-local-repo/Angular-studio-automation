import { Employee } from 'app/feature/inner/employee/models/employee.model';
import { EmployeeRecord } from './employee-created.model';

export class Timeline {
    'createdAt': string;
    'updatedAt': string;
    'createdBy': string;
    'updatedBy': number;
    'orgId': number;
    'createByName': string;
    'updatedByName': string;
    'description': string;
    'parentId': number;
    'employee': EmployeeRecord;
    'id': number;
}
