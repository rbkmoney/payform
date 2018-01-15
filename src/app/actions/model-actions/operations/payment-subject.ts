import { IntegrationType } from 'checkout/config';

export interface PaymentSubject {
    invoiceID: string;
    accessToken: string;
    integrationType?: IntegrationType;
}
