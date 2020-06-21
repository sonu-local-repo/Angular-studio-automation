import { BaseDTO } from '@shared/models/base-dto.mode';
import { EmployeeScreenView } from './employee-screen-view.model';

export class EmployeeScreenViewGroup extends BaseDTO {
    public moduleName: string;
    public views: EmployeeScreenView[];
}
