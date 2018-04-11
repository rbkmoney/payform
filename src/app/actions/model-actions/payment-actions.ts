import { AbstractAction, TypeKeys } from 'checkout/actions';
import { Config } from 'checkout/config';
import {
    ModelState,
    PayableFormValues,
    PaymentMethodName
} from 'checkout/state';
import { LogicError } from 'checkout/backend';

export interface PaymentRequestedPayload {
    method: PaymentMethodName;
    config: Config;
    model: ModelState;
    values: PayableFormValues;
}

export interface PaymentRequested extends AbstractAction<PaymentRequestedPayload> {
    type: TypeKeys.PAYMENT_REQUESTED;
    payload: PaymentRequestedPayload;
}

export interface PaymentCompleted extends AbstractAction {
    type: TypeKeys.PAYMENT_COMPLETED;
}

export interface PaymentFailed extends AbstractAction<LogicError> {
    type: TypeKeys.PAYMENT_FAILED;
    payload: LogicError;
}

export const pay = (payload: PaymentRequestedPayload): PaymentRequested => ({
    type: TypeKeys.PAYMENT_REQUESTED,
    payload
});
