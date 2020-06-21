
import { EmployeeAddress } from './employee-address.model';
import { EmployeePosition } from './employee-position.model';
import { EmployeeDepartment } from './employee-department.model';

export class Employee {
    public id: number;
    public employeeNo: string;

    public firstName: string;
    public lastName: string;
    public gender: string;
    public phone: string;
    public email: string;

    public addressId: number;
    public addresses: EmployeeAddress[];
    public positionId: number;
    public positions: EmployeePosition[];
    // public departments: EmployeeDepartment[];
    public responsibilities: any[];

    public userName: string;
    public password: string;

    public dob: string;
    public doj: string;
    public dot: string;

    public status: string;
    public createdAt: string;
    public createdBy: number;
    public updatedAt: string;
    public updatedBy: number;
}
