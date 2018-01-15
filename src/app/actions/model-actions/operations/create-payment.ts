import { PaymentResource, createPayment as capiRequest, FlowType, PayerType } from 'checkout/backend';
import { PaymentSubject } from './payment-subject';

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
