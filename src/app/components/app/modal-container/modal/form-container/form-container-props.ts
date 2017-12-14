import {
    ChangeStageStatus,
    ChangeStepStatus,
    CreateInvoiceWithTemplateDispatch,
    CreatePaymentDispatch,
    CreatePaymentResourceDispatch,
    GetInvoiceEventsDispatch,
    SetInvoiceAccessToken
} from 'checkout/actions';
import { InvoiceParamsWithTemplate, PaymentParams, PaymentTool } from 'checkout/backend/model';
import { ConfigState, FormFlowItem, ModelState } from 'checkout/state';
import { CardPaymentStage, StageStatus, StepStatus } from 'checkout/lifecycle';

export interface FormContainerProps {
    config: ConfigState;
    model: ModelState;
    formsFlow: FormFlowItem[];
    cardPayment: CardPaymentStage;
    createInvoiceWithTemplate: (capiEndpoint: string, accessToken: string, invoiceTemplateID: string, params: InvoiceParamsWithTemplate) => CreateInvoiceWithTemplateDispatch;
    createPaymentResource: (capiEndpoint: string, accessToken: string, paymentTool: PaymentTool) => CreatePaymentResourceDispatch;
    createPayment: (capiEndpoint: string, accessToken: string, invoiceID: string, paymentParams: PaymentParams) => CreatePaymentDispatch;
    getInvoiceEvents: (capiEndpoint: string, accessToken: string, invoiceID: string) => GetInvoiceEventsDispatch;
    changeStepStatus: (stageName: string, stepName: string, value: StepStatus) => ChangeStepStatus;
    changeStageStatus: (stageName: string, value: StageStatus) => ChangeStageStatus;
    setInvoiceAccessToken: (token: string) => SetInvoiceAccessToken;
}
