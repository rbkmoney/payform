import { all, AllEffect, call, CallEffect, put, PutEffect, select, SelectEffect } from 'redux-saga/effects';
import {
    InvoiceTemplate,
    PaymentMethod,
    Invoice,
    getCustomerEvents,
    getInvoiceEvents,
    getInvoicePaymentMethods,
    getInvoicePaymentMethodsByTemplateID,
    getInvoiceTemplateByID,
    getInvoiceByID,
    Event
} from 'checkout/backend';
import {
    CustomerInitConfig,
    InitConfig,
    IntegrationType,
    InvoiceInitConfig,
    InvoiceTemplateInitConfig
} from 'checkout/config';
import { InitializeModelCompleted, SetEventsAction, TypeKeys } from 'checkout/actions';
import { EventsState, ModelState, State } from 'checkout/state';

export interface ModelChunk {
    invoiceTemplate?: InvoiceTemplate;
    events?: Event[];
    paymentMethods?: PaymentMethod[];
    invoiceAccessToken?: string;
    invoice?: Invoice;
}

export function* resolveInvoiceTemplate(
    endpoint: string,
    config: InvoiceTemplateInitConfig
): Iterator<AllEffect | ModelChunk> {
    const token = config.invoiceTemplateAccessToken;
    const id = config.invoiceTemplateID;
    const [invoiceTemplate, paymentMethods] = yield all([
        call(getInvoiceTemplateByID, endpoint, token, id),
        call(getInvoicePaymentMethodsByTemplateID, endpoint, token, id)
    ]);
    return { paymentMethods, invoiceTemplate };
}

export function* resolveInvoice(endpoint: string, config: InvoiceInitConfig): Iterator<AllEffect | ModelChunk> {
    const token = config.invoiceAccessToken;
    const id = config.invoiceID;
    const [invoice, events, paymentMethods] = yield all([
        call(getInvoiceByID, endpoint, token, id),
        call(getInvoiceEvents, endpoint, token, id),
        call(getInvoicePaymentMethods, endpoint, token, id)
    ]);
    return { paymentMethods, events, invoiceAccessToken: token, invoice };
}

export function* resolveCustomer(endpoint: string, config: CustomerInitConfig): Iterator<CallEffect | ModelChunk> {
    const token = config.customerAccessToken;
    const id = config.customerID;
    const events = yield call(getCustomerEvents, endpoint, token, id);
    return { events };
}

export function* resolveIntegrationType(endpoint: string, config: InitConfig): Iterator<CallEffect | ModelChunk> {
    let chunk;
    switch (config.integrationType) {
        case IntegrationType.invoiceTemplate:
            chunk = yield call(resolveInvoiceTemplate, endpoint, config);
            break;
        case IntegrationType.invoice:
            chunk = yield call(resolveInvoice, endpoint, config);
            break;
        case IntegrationType.customer:
            chunk = yield call(resolveCustomer, endpoint, config);
            break;
    }
    return chunk;
}

export type InitializeEffect =
    | CallEffect
    | PutEffect<InitializeModelCompleted | SetEventsAction | SetEventsAction>
    | SelectEffect
    | { model: ModelState; events: EventsState };

export function* initializeModel(endpoint: string, config: InitConfig): Iterator<InitializeEffect> {
    const { events, ...modelChunk } = yield call(resolveIntegrationType, endpoint, config);
    yield put({ type: TypeKeys.INITIALIZE_MODEL_COMPLETED, payload: modelChunk } as InitializeModelCompleted);
    yield put({ type: TypeKeys.EVENTS_INIT, payload: events } as SetEventsAction);
    return yield select((s: State) => ({ model: s.model, events: s.events }));
}
