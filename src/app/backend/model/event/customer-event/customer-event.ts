import { CustomerChange } from './customer-change';

export class CustomerEvent {
    id: number;
    createdAt: string;
    changes: CustomerChange[];
}
