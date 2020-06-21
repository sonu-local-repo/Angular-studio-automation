import { OrderPageDetails } from './order-page-details.model';

export class OrderPage {
    public id: number;
    public orderId: number;
    public pageNo: number;
    public comments: string;
    public type: string;
    public pageDetails: OrderPageDetails[];

    public isSelected: boolean;
}
