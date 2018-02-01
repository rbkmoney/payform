import { CustomerChange } from './customer-change';
import { UserInteraction } from '../user-interaction';

export class CustomerBindingInteractionRequested extends CustomerChange {
    customerBindingID: string;
    userInteraction: UserInteraction;
}
