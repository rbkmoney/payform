import { PaymentSubject } from './get-payment-subject';
import { PaymentResource, createPayment as capiRequest, FlowType, PayerType } from 'checkout/backend';

export const createPayment = (s: PaymentSubject, endpoint: string, r: PaymentResource, email: string) => {
    const {paymentToolToken, paymentSession} = r;
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
    return capiRequest(endpoint, s.accessToken, s.invoiceID, request);
};
