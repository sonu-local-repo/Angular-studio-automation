import { Deserializable } from './deserializable.model';

export class EstimateLineItems implements Deserializable {
    public amount: number;
    public description: string;
    public orgId: string;
    public id: number;
    public optyId: number;
    public quoteLineId: number;
    public estimateId: number;
    public quantity: number;

    public createdAt: string;
    public updatedAt: string;
    public createdBy: number;
    public updatedBy: number;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}
