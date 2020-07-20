import { EstimateLineItems } from './estimateLine.model';
import { Deserializable } from './deserializable.model';
export class Estimate implements Deserializable {

    public quoteId: number;
    public estimateNumber: string;
    public contactId: number;
    public estimateDate: string;
    public scheduledDate: string;
    public totalAmount: string;
    public orgId: number;
    public id: number;
    public optyId: number;
    public status: string;
    public subTotal: string;
    public discount: string;
    public subTotalLessDiscount: string;
    public taxRate: string;
    public totalTax: string;
    public handling: string;

    public createdAt: string;
    public updatedAt: string;
    public createdBy: number;
    public updatedBy: number;
    public estimateLineItems: EstimateLineItems[];

    deserialize(input: any): this {
        this.estimateLineItems = [new EstimateLineItems().deserialize(input.estimateLineItems)];
        return Object.assign(this, input);
    }




}
