import { BaseDTO } from '@shared/models/base-dto.mode';

export class EmployeeScreenView extends BaseDTO {
    public id: number;
    public employeeId: number;

    public screenId: number;
    public moduleId: number;
    public type: 'View' | 'Module';
    public name: string;

    public viewInt: boolean;
    public editInt: boolean;
    public deleteInt: boolean;
}
