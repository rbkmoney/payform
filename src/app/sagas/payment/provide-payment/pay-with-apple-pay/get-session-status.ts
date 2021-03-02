import { InvoiceEvent } from 'checkout/backend';
import { isPaymentResultSuccess } from 'checkout/utils';

export const getSessionStatus = (event: InvoiceEvent): number =>
    isPaymentResultSuccess(event) ? ApplePaySession.STATUS_SUCCESS : ApplePaySession.STATUS_FAILURE;
