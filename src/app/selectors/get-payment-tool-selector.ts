import { createSelector } from 'reselect';
import {
    PaymentStarted,
    PayerType,
    InvoiceChangeType,
    PaymentResourcePayer,
    PaymentToolDetailsType,
    PaymentToolDetailsPaymentTerminal,
    Payer,
    PaymentToolDetails
} from '../backend';
import get from 'lodash-es/get';
import { getChangesSelector } from './get-changes-selector';

function isPaymentResourcePayer(payer: Payer): payer is PaymentResourcePayer {
    return get(payer, 'payerType') === PayerType.PaymentResourcePayer;
}

function isPaymentToolDetailsPaymentTerminal(
    paymentToolDetails: PaymentToolDetails
): paymentToolDetails is PaymentToolDetailsPaymentTerminal {
    return get(paymentToolDetails, 'detailsType') === PaymentToolDetailsType.PaymentToolDetailsPaymentTerminal;
}

export const getPaymentToolSelector = createSelector(getChangesSelector, (changes) => {
    const paymentStarted = changes.find((c) => c.changeType === InvoiceChangeType.PaymentStarted) as PaymentStarted;
    const { payer } = paymentStarted.payment;
    if (!isPaymentResourcePayer(payer)) {
        return null;
    }
    const { paymentToolDetails } = payer;
    if (!isPaymentToolDetailsPaymentTerminal(paymentToolDetails)) {
        return null;
    }
    return paymentToolDetails;
});
