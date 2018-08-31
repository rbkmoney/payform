import { CustomerChange } from './customer-change';
import { Event } from 'checkout/backend/model/event/event';

export class CustomerEvent extends Event<CustomerChange> {}
