import { BaseDTO } from '@shared/models/base-dto.mode';

export class ScreenView extends BaseDTO {
    public id: number;
    public name: string;
    public type: 'View' | 'Module';
    public moduleId: number;
}
