import { AbstractAction, TypeKeys } from 'checkout/actions';
import { CardFormValues } from 'checkout/state';
import { LogicError } from 'checkout/backend';

export interface SubscriptionRequested extends AbstractAction<CardFormValues> {
    type: TypeKeys.SUBSCRIPTION_REQUESTED;
    payload: CardFormValues;
}

export interface SubscriptionCompleted extends AbstractAction {
    type: TypeKeys.SUBSCRIPTION_COMPLETED;
}

export interface SubscriptionFailed extends AbstractAction<LogicError> {
    type: TypeKeys.SUBSCRIPTION_FAILED;
    payload: LogicError;
}

export const subscribe = (payload: CardFormValues) => ({
    type: TypeKeys.SUBSCRIPTION_REQUESTED,
    payload
});
