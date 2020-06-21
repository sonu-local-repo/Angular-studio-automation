import { OrderPage } from './order-page.model';

export class Order {

    public constructor(
        init?: Partial<Order>
    ) {
        Object.assign(this, init);
        this.value0 = init['albumType'];
        this.value1 = init['coverType'];
        this.value2 = init['bagType'];
    }

    public id: number;
    public parentOrderId: number;
    public customerId: number;
    public customerName: string;
    public email: string;
    public phone: string;

    public type: string; // album/momento
    public subType: string;
    public size: string;
    public quantity: string;
    public priority: string; // normal/medium/high
    public dueDate: string;
    public notes: string;

    public pages: OrderPage[];
    public relatedOrderCount: number;

    public value0: string;
    public value1: string;
    public value2: string;
    public value3: string;
    public value4: string;
    public value5: string;
    public value6: string;
    public value7: string;
    public value8: string;
    public value9: string;

    public status: string;

    public createdAt: string;
    public createdBy: number;
    public updatedAt: string;
    public updatedBy: number;
}
