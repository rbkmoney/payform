import { call, CallEffect } from 'redux-saga/effects';
import { createCardData } from '../../create-payment-resource';
import { CardFormValues, ConfigState, ModelState } from 'checkout/state';
import { CustomerInitConfig } from 'checkout/config';
import { createBinding, CustomerEvent } from 'checkout/backend';
import { pollCustomerEvents } from '../../poll-events';

type Effects = CallEffect | CustomerEvent;

export function* provideSubscription(c: ConfigState, m: ModelState, v: CardFormValues): Iterator<Effects> {
    const {customerAccessToken, customerID} = c.initConfig as CustomerInitConfig;
    const {capiEndpoint} = c.appConfig;
    const paymentResource = yield call(createCardData, capiEndpoint, v, customerAccessToken);
    yield call(createBinding, capiEndpoint, customerAccessToken, customerID, paymentResource);
    return yield call(pollCustomerEvents, capiEndpoint, customerAccessToken, customerID);
}
