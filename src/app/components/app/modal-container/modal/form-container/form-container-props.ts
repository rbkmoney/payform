import {
    ChangeStageStatus,
    ChangeStepStatus,
    CreateInvoiceWithTemplateDispatch,
    CreatePaymentDispatch,
    CreatePaymentResourceDispatch,
    SetInvoiceAccessToken,
    PollInvoiceEventsDispatch,
    SetFormsFlowAction
} from 'checkout/actions';
import { InvoiceParamsWithTemplate, PaymentParams, PaymentTool } from 'checkout/backend/model';
import { ConfigState, ModelState } from 'checkout/state';
import { CardPaymentStage, StageStatus, StepStatus } from 'checkout/lifecycle';
import { FormFlowItem } from 'checkout/form-flow';

export interface FormContainerProps {
    config: ConfigState;
    model: ModelState;
    formsFlow: FormFlowItem[];
    cardPayment: CardPaymentStage;
    createInvoiceWithTemplate: (capiEndpoint: string, accessToken: string, invoiceTemplateID: string, params: InvoiceParamsWithTemplate) => CreateInvoiceWithTemplateDispatch;
    createPaymentResource: (capiEndpoint: string, accessToken: string, paymentTool: PaymentTool) => CreatePaymentResourceDispatch;
    createPayment: (capiEndpoint: string, accessToken: string, invoiceID: string, paymentParams: PaymentParams) => CreatePaymentDispatch;
    changeStepStatus: (stageName: string, stepName: string, value: StepStatus) => ChangeStepStatus;
    changeStageStatus: (stageName: string, value: StageStatus) => ChangeStageStatus;
    setInvoiceAccessToken: (token: string) => SetInvoiceAccessToken;
    pollInvoiceEvents: (capiEndpoint: string, accessToken: string, invoiceID: string, eventID: number) => PollInvoiceEventsDispatch;
    setFormFlow: (formFlow: FormFlowItem[]) => SetFormsFlowAction;
}
