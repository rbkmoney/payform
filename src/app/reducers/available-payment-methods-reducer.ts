import { PaymentMethod } from 'checkout/state';
import { InitializeAvailablePaymentMethodsCompleted, TypeKeys } from 'checkout/actions';

type Action = InitializeAvailablePaymentMethodsCompleted;

export function availablePaymentMethodsReducer(s: PaymentMethod[] = null, action: Action): PaymentMethod[] {
    switch (action.type) {
        case TypeKeys.INITIALIZE_AVAILABLE_PAYMENT_METHODS_COMPLETED:
            return action.payload;
    }
    return s;
}
