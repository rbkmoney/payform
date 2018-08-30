import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';
import { PaymentMethod, ModelState, EventsState } from 'checkout/state';
import { InitializeModalCompleted, TypeKeys } from 'checkout/actions';
import { InitConfig, IntegrationType } from 'checkout/config';
import { toInitialState } from './to-initial-state';
import { initFromInvoiceEvents } from './intit-from-invoice-events';
import { initFromCustomerEvents } from './init-from-customer-events';

type Effects = CallEffect | PutEffect<InitializeModalCompleted>;

export function* initializeModal(
    initConfig: InitConfig,
    events: EventsState,
    methods: PaymentMethod[]
): Iterator<Effects> {
    let initializedModals;
    const { integrationType, initialPaymentMethod } = initConfig;
    switch (integrationType) {
        case IntegrationType.invoiceTemplate:
            initializedModals = yield call(toInitialState, methods, initialPaymentMethod);
            break;
        case IntegrationType.invoice:
            initializedModals = yield call(initFromInvoiceEvents, events.invoiceEvents, methods, initialPaymentMethod);
            break;
        case IntegrationType.customer:
            initializedModals = initFromCustomerEvents(events.customerEvents);
            break;
        default:
            throw { code: 'error.unsupported.integration.type' };
    }
    yield put({
        type: TypeKeys.INITIALIZE_MODAL_COMPLETED,
        payload: initializedModals
    } as InitializeModalCompleted);
}
