import { toInitialModal } from './to-initial-modal';
import { CardFormInfo } from 'checkout/state';

export const toInitialCustomerState = () => toInitialModal([new CardFormInfo()]);
