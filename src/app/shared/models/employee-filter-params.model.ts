import { PaginationParams } from '@shared/models/pagination-params.model';

export class EmployeeFilterParams extends PaginationParams {
    public firstName: string;
    public lastName: string;
}
