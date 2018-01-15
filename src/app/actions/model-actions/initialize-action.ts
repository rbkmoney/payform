import { Dispatch } from 'redux';
import { AbstractAction, SetErrorAction, TypeKeys } from 'checkout/actions';
import { ConfigState, ModelState } from 'checkout/state';
import { IntegrationType, InvoiceInitConfig, InvoiceTemplateInitConfig } from 'checkout/config';
import {
    getInvoiceEvents,
    getInvoicePaymentMethods,
    getInvoicePaymentMethodsByTemplateID,
    getInvoiceTemplateByID,
    InvoiceTemplate, Event,
    PaymentMethod
} from 'checkout/backend';

export interface Initialize extends AbstractAction<ModelState> {
    type: TypeKeys.INIT_MODEL;
    payload: ModelState;
}

export type InitializeDispatch = (dispatch: Dispatch<Initialize | SetErrorAction>) => void;

interface ModelChunk {
    invoiceTemplate?: InvoiceTemplate;
    invoiceEvents?: Event[];
    paymentMethods?: PaymentMethod[];
}

const resolveInvoiceTemplate = (endpoint: string, config: InvoiceTemplateInitConfig): Promise<ModelChunk> =>
    getInvoiceTemplateByID(endpoint, config.invoiceTemplateAccessToken, config.invoiceTemplateID).then((invoiceTemplate) =>
        getInvoicePaymentMethodsByTemplateID(endpoint, config.invoiceTemplateAccessToken, config.invoiceTemplateID).then((paymentMethods) =>
            ({invoiceTemplate, paymentMethods})));

const resolveInvoice = (endpoint: string, config: InvoiceInitConfig): Promise<ModelChunk> =>
    getInvoiceEvents(endpoint, config.invoiceAccessToken, config.invoiceID).then((invoiceEvents) =>
        getInvoicePaymentMethods(endpoint, config.invoiceAccessToken, config.invoiceID).then((paymentMethods) =>
            ({invoiceEvents, paymentMethods})));

const resolve = (config: ConfigState): Promise<ModelChunk> => {
    const endpoint = config.appConfig.capiEndpoint;
    switch (config.initConfig.integrationType) {
        case IntegrationType.invoiceTemplate:
            return resolveInvoiceTemplate(endpoint, config.initConfig as InvoiceTemplateInitConfig);
        case IntegrationType.invoice:
            return resolveInvoice(endpoint, config.initConfig as InvoiceInitConfig);
        case IntegrationType.customer:
            throw new Error('Unsupported integration type');
    }
};

export const initialize = (config: ConfigState): InitializeDispatch =>
    (dispatch) => resolve(config)
        .then((modalState) => dispatch({
            type: TypeKeys.INIT_MODEL,
            payload: modalState
        }))
        .catch((error) => dispatch({
            type: TypeKeys.SET_ERROR,
            payload: error
        }));
