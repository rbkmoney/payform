import { Dispatch } from 'redux';
import { AbstractAction, SetErrorAction, TypeKeys } from 'checkout/actions';
import { ConfigState, ModelState } from 'checkout/state';
import { CustomerInitConfig, IntegrationType, InvoiceInitConfig, InvoiceTemplateInitConfig } from 'checkout/config';
import {
    getInvoiceEvents,
    getInvoicePaymentMethods,
    getInvoicePaymentMethodsByTemplateID,
    getInvoiceTemplateByID,
    InvoiceTemplate, Event,
    PaymentMethod,
    getCustomerEvents,
    CustomerEvent
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
    invoiceAccessToken?: string;
    customerEvents?: CustomerEvent[];
}

const resolveInvoiceTemplate = (endpoint: string, config: InvoiceTemplateInitConfig): Promise<ModelChunk> =>
    getInvoiceTemplateByID(endpoint, config.invoiceTemplateAccessToken, config.invoiceTemplateID).then((invoiceTemplate) =>
        getInvoicePaymentMethodsByTemplateID(endpoint, config.invoiceTemplateAccessToken, config.invoiceTemplateID).then((paymentMethods) =>
            ({invoiceTemplate, paymentMethods})));

const resolveInvoice = (endpoint: string, config: InvoiceInitConfig): Promise<ModelChunk> =>
    getInvoiceEvents(endpoint, config.invoiceAccessToken, config.invoiceID).then((invoiceEvents) =>
        getInvoicePaymentMethods(endpoint, config.invoiceAccessToken, config.invoiceID).then((paymentMethods) =>
            ({invoiceEvents, paymentMethods, invoiceAccessToken: config.invoiceAccessToken})));

const resolveCustomer = (endpoint: string, config: CustomerInitConfig): Promise<ModelChunk> =>
    getCustomerEvents(endpoint, config.customerAccessToken, config.customerID).then((customerEvents) =>
        ({customerEvents}));

const resolve = (config: ConfigState): Promise<ModelChunk> => {
    const endpoint = config.appConfig.capiEndpoint;
    switch (config.initConfig.integrationType) {
        case IntegrationType.invoiceTemplate:
            return resolveInvoiceTemplate(endpoint, config.initConfig as InvoiceTemplateInitConfig);
        case IntegrationType.invoice:
            return resolveInvoice(endpoint, config.initConfig as InvoiceInitConfig);
        case IntegrationType.customer:
            return resolveCustomer(endpoint, config.initConfig as CustomerInitConfig);
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
