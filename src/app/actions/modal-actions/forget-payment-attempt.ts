import { AbstractAction, TypeKeys } from 'checkout/actions';

export interface ForgetPaymentAttempt extends AbstractAction {
    type: TypeKeys.FORGET_PAYMENT_ATTEMPT;
}

export const forgetPaymentAttempt = (): ForgetPaymentAttempt => ({
    type: TypeKeys.FORGET_PAYMENT_ATTEMPT
});
