import { PaginationParams } from '@shared/models/pagination-params.model';

export class SearchParams extends PaginationParams {
    public searchString: string;
}
