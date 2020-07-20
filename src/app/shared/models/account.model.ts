import { Address } from './address.model';

export class Account {
    'id': number;
    'name': string;
    'status': string;
    'parentAccountId': number;
    'phone': string;
    'mobile': string;
    'email': string;
    'type': string;
    'addresses': Address[];
    'billingAddress': string;
    'mailingAddress': string;
    'comments': string;
    'owner': number;
    'orgId': number;
    'createdAt': string;
    'updatedAt': string;
    'createdBy': string;
    'updatedBy': string;
}
