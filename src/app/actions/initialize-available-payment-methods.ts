import { AbstractAction } from 'checkout/actions/abstract-action';
import { PaymentMethod } from 'checkout/state';
import { TypeKeys } from 'checkout/actions/type-keys';

export interface InitializeAvailablePaymentMethodsCompleted extends AbstractAction<PaymentMethod[]> {
    type: TypeKeys.INITIALIZE_AVAILABLE_PAYMENT_METHODS_COMPLETED;
    payload: PaymentMethod[];
}
