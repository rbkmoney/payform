import { PaymentResource } from 'checkout/backend';
import { CustomerBindingStatus } from './customer-binding-status';
import { CustomerBindingError } from './customer-binding-error';

export class CustomerBinding {
    id: string;
    paymentResource: PaymentResource;
    status: CustomerBindingStatus;
    error: CustomerBindingError;
    customerBindingID: string;
}
