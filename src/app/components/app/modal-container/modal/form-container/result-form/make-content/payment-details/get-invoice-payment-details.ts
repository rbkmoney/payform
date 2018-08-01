import {
    Event,
    InvoiceChangeType,
    PayerType,
    PaymentResourcePayer,
    PaymentStarted,
    PaymentToolDetails,
    PaymentToolDetailsBankCard,
    PaymentToolDetailsType
} from 'checkout/backend';
import { PaymentToolDetailsDigitalWallet, PaymentToolDetailsPaymentTerminal } from 'checkout/backend/model';
import { findChange } from 'checkout/utils';
import { toDigitalWalletInfo, toCardInfo, toTerminalInfo } from './details-to-info';
import { PaymentDetailsInfo } from './payment-details-info';
import { logPrefix } from 'checkout/log-messages';

const toDetailsInfo = (details: PaymentToolDetails): string => {
    switch (details.detailsType) {
        case PaymentToolDetailsType.PaymentToolDetailsBankCard:
            return toCardInfo(details as PaymentToolDetailsBankCard);
        case PaymentToolDetailsType.PaymentToolDetailsDigitalWallet:
            return toDigitalWalletInfo(details as PaymentToolDetailsDigitalWallet);
        case PaymentToolDetailsType.PaymentToolDetailsPaymentTerminal:
            return toTerminalInfo(details as PaymentToolDetailsPaymentTerminal);
        default:
            console.warn(`${logPrefix} Unsupported PaymentToolDetailsType`, details);
            return '';
    }
};

const getPaymentToolDetails = (e: Event[]): PaymentToolDetails => {
    const change = findChange(e, InvoiceChangeType.PaymentStarted) as PaymentStarted;
    const payer = change.payment.payer;
    switch (payer.payerType) {
        case PayerType.PaymentResourcePayer:
            return (payer as PaymentResourcePayer).paymentToolDetails;
        case PayerType.CustomerPayer:
            throw new Error('Unsupported CustomerPayer');
    }
    throw new Error('Unsupported PayerType');
};

export const getInvoicePaymentDetails = (e: Event[]): PaymentDetailsInfo => {
    const paymentToolDetails = getPaymentToolDetails(e);
    const info = toDetailsInfo(paymentToolDetails);
    return { type: paymentToolDetails.detailsType, info };
};
