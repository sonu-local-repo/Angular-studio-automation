import { PaginationParams } from '@shared/models/pagination-params.model';

export class CustomerFilterParams extends PaginationParams {
    public name: string;
    public mobile: string;
}
