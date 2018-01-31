import { CustomerBindingStatus } from './customer-binding-status';
import { CustomerBindingError } from './customer-binding-error';
import { CustomerChange } from './customer-change';

export class CustomerBindingStatusChanged extends CustomerChange {
    status: CustomerBindingStatus;
    error: CustomerBindingError;
    customerBindingID: string;
}
