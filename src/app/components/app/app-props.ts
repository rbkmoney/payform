import { Invoice } from 'checkout/backend';
import {
    GetAppConfigDispatch,
    GetInvoicePaymentMethodsDispatch,
    GetInvoiceTemplateDispatch,
    GetInvoicePaymentMethodsByTemplateIdDispatch,
    GetLocaleDispatch,
    SetFormsFlowAction,
    ChangeStepStatus,
    ChangeStageStatus,
    GetInvoiceEventsDispatch,
    SetInvoice
} from 'checkout/actions';
import { ConfigState, ModelState, ErrorState, FormFlowItem } from 'checkout/state';
import { StageStatus, StepStatus, InitializationStage } from 'checkout/lifecycle';

export interface AppProps {
    getAppConfig: () => GetAppConfigDispatch;
    getLocaleConfig: () => GetLocaleDispatch;
    getInvoiceTemplate: (capiEndpoint: string, accessToken: string, invoiceTemplateID: string) => GetInvoiceTemplateDispatch;
    getInvoicePaymentMethods: (capiEndpoint: string, accessToken: string, invoiceID: string) => GetInvoicePaymentMethodsDispatch;
    getInvoicePaymentMethodsByTemplateId: (capiEndpoint: string, accessToken: string, invoiceTemplateID: string) => GetInvoicePaymentMethodsByTemplateIdDispatch;
    getInvoiceEvents: (capiEndpoint: string, accessToken: string, invoiceID: string) => GetInvoiceEventsDispatch;
    setFormFlowAction: (formFlow: FormFlowItem[]) => SetFormsFlowAction;
    config: ConfigState;
    model: ModelState;
    error: ErrorState;
    initialization: InitializationStage;
    formsFlow: FormFlowItem[];
    changeStepStatus: (stageName: string, stepName: string, value: StepStatus) => ChangeStepStatus;
    changeStageStatus: (stageName: string, value: StageStatus) => ChangeStageStatus;
    setInvoice: (invoice: Invoice) => SetInvoice;
}
