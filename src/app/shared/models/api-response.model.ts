export class ApiResponse<T> {
    public content: T;
    public empty: boolean;
    public first: boolean;
    public last: boolean;
    public number: number;
    public numberOfElements: number;
    public pageable: any;
    public size: number;
    public sort: any;
    public totalElements: number;
    public totalPages: number;
}
