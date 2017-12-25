import { CardFormFlowItem } from 'checkout/form-flow/flow-item';
import { StepStatus } from 'checkout/lifecycle';
import { FormContainerProps } from '../../form-container-props';
import { FlowType, PayerType } from 'checkout/backend';
import { Shortened } from '../form-flow-resolver';

const createPayment = (p: FormContainerProps, i: CardFormFlowItem) => {
    const endpoint = p.config.appConfig.capiEndpoint;
    const token = p.model.invoiceAccessToken;
    const invoiceID = p.model.invoice.id;
    const email = i.values.email;
    const {paymentToolToken, paymentSession} = p.model.paymentResource;
    const request = {
        flow: {
            type: FlowType.PaymentFlowInstant
        },
        payer: {
            payerType: PayerType.PaymentResourcePayer,
            paymentToolToken,
            paymentSession,
            contactInfo: {
                email
            }
        }
    };
    p.createPayment(endpoint, token, invoiceID, request);
};

export const resolvePayment = (fn: Shortened, p: FormContainerProps, i: CardFormFlowItem) => {
    const done = !!p.model.payment;
    const start = p.cardPayment.createPaymentResource === StepStatus.done;
    fn('createPayment', createPayment.bind(null, p, i), done, start);
};
