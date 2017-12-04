import {
    GetAppConfigDispatch,
    GetInvoicePaymentMethodsDispatch,
    GetInvoiceTemplateDispatch,
    GetInvoiceDispatch,
    InitStageDoneAction,
    InitStageStartAction,
    GetInvoicePaymentMethodsByTemplateIdDispatch,
    GetLocaleDispatch
} from 'checkout/actions';
import { ConfigState, ModelState, InitializationStage, ErrorState } from 'checkout/state';

export interface AppProps {
    getAppConfig: () => GetAppConfigDispatch;
    getLocaleConfig: () => GetLocaleDispatch;
    getInvoiceTemplate: (capiEndpoint: string, accessToken: string, invoiceTemplateID: string) => GetInvoiceTemplateDispatch;
    getInvoice: (capiEndpoint: string, accessToken: string, invoiceID: string) => GetInvoiceDispatch;
    getInvoicePaymentMethods: (capiEndpoint: string, accessToken: string, invoiceID: string) => GetInvoicePaymentMethodsDispatch,
    getInvoicePaymentMethodsByTemplateId: (capiEndpoint: string, accessToken: string, invoiceTemplateID: string) => GetInvoicePaymentMethodsByTemplateIdDispatch
    setInitStageStart: () => InitStageStartAction;
    setInitStageDone: () => InitStageDoneAction;
    config: ConfigState;
    model: ModelState;
    error: ErrorState;
    initialization: InitializationStage;
}
