export class Service {
    public id: number;
    public categoryId: number;
    public name: string;
    public type: string;
    public status: string;
    public subStatus: string;
    public description: string;
    public child: Service[];

    public createdAt: string;
    public createdBy: number;
    public updatedAt: string;
    public updatedBy: number;
}
