import { ModalState, PaymentMethod } from 'checkout/state';
import { PaymentMethodName as PaymentMethodNameConfig } from 'checkout/config';
import { toInitialPaymentMethod } from './to-initial-payment-method';
import { toInitialForm } from './to-initial-form';
import { toInitialModal } from './to-initial-modal';

export const toInitialState = (methods: PaymentMethod[], initialPaymentMethod: PaymentMethodNameConfig): ModalState => {
    const isMultiMethods = methods.length > 1;
    const formInfo = initialPaymentMethod
        ? toInitialPaymentMethod(isMultiMethods, initialPaymentMethod)
        : toInitialForm(isMultiMethods, methods[0]);
    return toInitialModal(formInfo);
};
