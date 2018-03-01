import { all, AllEffect, call, CallEffect, put, PutEffect } from 'redux-saga/effects';
import {
    CustomerEvent,
    Event,
    getCustomerEvents,
    getInvoiceEvents,
    getInvoicePaymentMethods,
    getInvoicePaymentMethodsByTemplateID,
    getInvoiceTemplateByID, InvoiceTemplate, PaymentMethod
} from 'checkout/backend';
import {
    CustomerInitConfig,
    InitConfig,
    IntegrationType,
    InvoiceInitConfig,
    InvoiceTemplateInitConfig
} from 'checkout/config';
import { Initialize, TypeKeys, SetErrorAction } from 'checkout/actions';

export interface ModelChunk {
    invoiceTemplate?: InvoiceTemplate;
    invoiceEvents?: Event[];
    paymentMethods?: PaymentMethod[];
    invoiceAccessToken?: string;
    customerEvents?: CustomerEvent[];
}

export function* resolveInvoiceTemplate(endpoint: string, config: InvoiceTemplateInitConfig): Iterator<AllEffect | ModelChunk> {
    const token = config.invoiceTemplateAccessToken;
    const id = config.invoiceTemplateID;
    const [invoiceTemplate, paymentMethods] = yield all([
        call(getInvoiceTemplateByID, endpoint, token, id),
        call(getInvoicePaymentMethodsByTemplateID, endpoint, token, id)
    ]);
    return {paymentMethods, invoiceTemplate};
}

export function* resolveInvoice(endpoint: string, config: InvoiceInitConfig): Iterator<AllEffect | ModelChunk> {
    const token = config.invoiceAccessToken;
    const id = config.invoiceID;
    const [invoiceEvents, paymentMethods] = yield all([
        call(getInvoiceEvents, endpoint, token, id),
        call(getInvoicePaymentMethods, endpoint, token, id)
    ]);
    return {paymentMethods, invoiceEvents, invoiceAccessToken: config.invoiceAccessToken};
}

export function* resolveCustomer(endpoint: string, config: CustomerInitConfig): Iterator<CallEffect | ModelChunk> {
    const token = config.customerAccessToken;
    const id = config.customerID;
    const customerEvents = yield call(getCustomerEvents, endpoint, token, id);
    return {customerEvents};
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

export type InitializeEffect = CallEffect | PutEffect<Initialize> | PutEffect<SetErrorAction>;

export function* initializeModel(endpoint: string, config: InitConfig): Iterator<InitializeEffect> {
    try {
        const modelChunk = yield call(resolveIntegrationType, endpoint, config);
        yield put({type: TypeKeys.INIT_MODEL, payload: modelChunk} as Initialize);
    } catch (error) {
        yield put({type: TypeKeys.SET_ERROR, payload: error} as SetErrorAction);
    }
}
