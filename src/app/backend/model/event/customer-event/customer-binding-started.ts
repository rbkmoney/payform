import { CustomerChange } from './customer-change';
import { CustomerBinding } from './customer-binding';

export class CustomerBindingStarted extends CustomerChange {
    customerBinding: CustomerBinding;
}
