import { PaginationParams } from '@shared/models/pagination-params.model';

export class OrderFilterParams extends PaginationParams {
    public custName: string;
    public phone: string;
    public email: string;
    public dueDate: string;
    public present: string;
    public priority: string;
    public status: string;
}
