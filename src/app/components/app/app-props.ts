import {
    GetAppConfigDispatch,
    GetInvoicePaymentMethodsDispatch,
    GetInvoiceTemplateDispatch,
    GetInvoiceDispatch,
    GetInvoicePaymentMethodsByTemplateIdDispatch,
    GetLocaleDispatch,
    SetFormsFlowAction,
    InitStageChange,
    StepName
} from 'checkout/actions';
import { ConfigState, ModelState, InitializationStage, ErrorState, FormFlowItem, StepStatus } from 'checkout/state';

export interface AppProps {
    getAppConfig: () => GetAppConfigDispatch;
    getLocaleConfig: () => GetLocaleDispatch;
    getInvoiceTemplate: (capiEndpoint: string, accessToken: string, invoiceTemplateID: string) => GetInvoiceTemplateDispatch;
    getInvoice: (capiEndpoint: string, accessToken: string, invoiceID: string) => GetInvoiceDispatch;
    getInvoicePaymentMethods: (capiEndpoint: string, accessToken: string, invoiceID: string) => GetInvoicePaymentMethodsDispatch,
    getInvoicePaymentMethodsByTemplateId: (capiEndpoint: string, accessToken: string, invoiceTemplateID: string) => GetInvoicePaymentMethodsByTemplateIdDispatch
    setFormFlowAction: (formFlow: FormFlowItem[]) => SetFormsFlowAction
    config: ConfigState;
    model: ModelState;
    error: ErrorState;
    initialization: InitializationStage;
    formsFlow: FormFlowItem[];
    changeStepStatus: (name: StepName, status: StepStatus | boolean) => InitStageChange
}
