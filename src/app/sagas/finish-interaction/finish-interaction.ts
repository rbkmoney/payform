import { call, CallEffect, ForkEffect, put, select, takeLatest } from 'redux-saga/effects';
import { TypeKeys } from 'checkout/actions';
import { ConfigState, ModelState, State } from 'checkout/state';
import { pollCustomerEvents, pollInvoiceEvents } from '../poll-events';
import { CustomerInitConfig, IntegrationType } from 'checkout/config';
import { provideFromInvoiceEvent, provideFromCustomerEvent } from '../provide-modal';

function* finishInvoice(capiEndpoint: string, token: string, invoiceID: string) {
    const event = yield call(pollInvoiceEvents, capiEndpoint, token, invoiceID);
    return yield call(provideFromInvoiceEvent, event);
}

function* finishCustomer(capiEndpoint: string, token: string, customerID: string) {
    const event = yield call(pollCustomerEvents, capiEndpoint, token, customerID);
    return yield call(provideFromCustomerEvent, event);
}

function* resolve(config: ConfigState, model: ModelState): Iterator<CallEffect> {
    const {initConfig, appConfig: {capiEndpoint}} = config;
    switch (initConfig.integrationType) {
        case IntegrationType.invoice:
        case IntegrationType.invoiceTemplate:
            const {invoiceAccessToken, invoice: {id}} = model;
            return yield call(finishInvoice, capiEndpoint, invoiceAccessToken, id);
        case IntegrationType.customer:
            const {customerID, customerAccessToken} = initConfig as CustomerInitConfig;
            return yield call(finishCustomer, capiEndpoint, customerAccessToken, customerID);
    }
}

export function* finishInteraction() {
    try {
        const {config, model} = yield select((s: State) => ({config: s.config, model: s.model}));
        yield put({
            type: TypeKeys.SET_MODAL_INTERACTION_POLLING,
            payload: true
        });
        yield call(resolve, config, model);
        yield put({
            type: TypeKeys.SET_MODAL_INTERACTION_POLLING,
            payload: false
        });
        yield put({
            type: TypeKeys.FINISH_INTERACTION_COMPLETED
        });
    } catch (error) {
        yield put({
            type: TypeKeys.FINISH_INTERACTION_FAILED,
            payload: error
        });
    }

}

export function* watchFinishInteraction(): Iterator<ForkEffect> {
    yield takeLatest(TypeKeys.FINISH_INTERACTION_REQUESTED, finishInteraction);
}
