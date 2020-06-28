import {BaseDTO} from "@shared/models/base-dto.mode";
import {ScreenView} from "./screen-view.model";
import {ViewModel} from "./view.model";

export class ResponsibilityModel extends BaseDTO{
  public id: number;
  public name: string;
  public status: string;
  public views: ViewModel[];

}
