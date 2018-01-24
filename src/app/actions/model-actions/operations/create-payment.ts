import { PaymentResource, createPayment as capiRequest, PayerType } from 'checkout/backend';
import { PaymentSubject } from './payment-subject';
import { PaymentFlow } from 'checkout/backend/model/payment-flow';

export const createPayment = (s: PaymentSubject, endpoint: string, r: PaymentResource, email: string, flow: PaymentFlow) => {
    const {paymentToolToken, paymentSession} = r;
    const request = {
        flow,
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
