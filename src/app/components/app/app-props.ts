import { Invoice } from 'checkout/backend';
import {
    GetAppConfigDispatch,
    GetInvoicePaymentMethodsDispatch,
    GetInvoiceTemplateDispatch,
    GetInvoicePaymentMethodsByTemplateIdDispatch,
    GetLocaleDispatch,
    SetFormsFlowAction,
    ChangeStepStatus,
    StepName,
    ChangeStageStatus,
    GetInvoiceEventsDispatch,
    SetInvoice
} from 'checkout/actions';
import {
    ConfigState,
    ModelState,
    InitializationStage,
    ErrorState,
    FormFlowItem,
    StepStatus,
    StageStatus
} from 'checkout/state';

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
    changeStepStatus: (name: StepName, status: StepStatus) => ChangeStepStatus;
    changeStageStatus: (status: StageStatus) => ChangeStageStatus;
    setInvoice: (invoice: Invoice) => SetInvoice;
}
