import {JobLineItem} from './joblineitem.model';

export class Jobs {
    'orgId': number;
    'id': number;
    'optyId': number;
    'accountId': number;
    'rate': number;
    'jobLine': JobLineItem[];

    'createdAt': string;
    'updatedAt': string;
    'createdBy': string;
    'updatedBy': string;
}
