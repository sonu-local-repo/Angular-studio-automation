import {Account} from './account.model';
import { Quote } from './quote.model';
export class Opportunity {
    'id': number;
    'name': string;
    'status': string;
    'source': string;
    'priority': string;
    'dueDate': string;
    'type': string;
    'stage': string;
    'nextStep': string;
    'owner': number;
    'assignedTo': string;
    'orgId': string;
    'createdAt': string;
    'updatedAt': string;
    'createdBy': string;
    'updatedBy': string;
    'accounts': Account[];
    'quotes': Quote[];
}

