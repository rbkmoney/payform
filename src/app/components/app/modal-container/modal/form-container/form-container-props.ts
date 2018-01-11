import {
    ChangeStageStatus,
    ChangeStepStatus,
    CreateInvoiceWithTemplateDispatch,
    CreatePaymentDispatch,
    CreatePaymentResourceDispatch,
    SetInvoiceAccessToken,
    PollInvoiceEventsDispatch,
    SetFormsFlowAction, SetErrorStatus,
} from 'checkout/actions';
import { InvoiceParamsWithTemplate, PaymentParams, PaymentTool } from 'checkout/backend/model';
import { ConfigState, ErrorHandleStatus, ErrorState, ModalState, ModelState } from 'checkout/state';
import { CardPaymentStage, StageStatus, StepStatus } from 'checkout/lifecycle';
import { FormFlowItem } from 'checkout/form-flow';
import { FormInfo } from 'checkout/state/modal/form-info';

export interface FormContainerProps {
    config: ConfigState;
    model: ModelState;
    formsFlow: FormFlowItem[];
    cardPayment: CardPaymentStage;
    error: ErrorState;
    formInfo: FormInfo;
    createInvoiceWithTemplate: (capiEndpoint: string, accessToken: string, invoiceTemplateID: string, params: InvoiceParamsWithTemplate) => CreateInvoiceWithTemplateDispatch;
    createPaymentResource: (capiEndpoint: string, accessToken: string, paymentTool: PaymentTool) => CreatePaymentResourceDispatch;
    createPayment: (capiEndpoint: string, accessToken: string, invoiceID: string, paymentParams: PaymentParams) => CreatePaymentDispatch;
    changeStepStatus: (stageName: string, stepName: string, value: StepStatus) => ChangeStepStatus;
    changeStageStatus: (stageName: string, value: StageStatus) => ChangeStageStatus;
    setInvoiceAccessToken: (token: string) => SetInvoiceAccessToken;
    pollInvoiceEvents: (capiEndpoint: string, accessToken: string, invoiceID: string, eventID: number) => PollInvoiceEventsDispatch;
    setFormFlow: (formFlow: FormFlowItem[]) => SetFormsFlowAction;
    setErrorStatus: (status: ErrorHandleStatus) => SetErrorStatus;
}
