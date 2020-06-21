import { BaseDTO } from '@shared/models/base-dto.mode';
import { ScreenView } from './screen-view.model';

export class ScreenViewGroup extends BaseDTO {
    public moduleName: string;
    public id: number;
    public views: ScreenView[];
}
