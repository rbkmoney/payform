import {
    CustomerBindingStarted,
    CustomerChangeType,
    CustomerEvent,
    PaymentToolDetails,
    PaymentToolDetailsBankCard,
    PaymentToolDetailsType
} from 'checkout/backend';
import { findChange } from 'checkout/utils';

const toCardDescription = (details: PaymentToolDetailsBankCard): string => `${details.paymentSystem} *${details.cardNumberMask}`;

const getPaymentToolDetails = (e: CustomerEvent[]): PaymentToolDetails => {
    const change = findChange(e, CustomerChangeType.CustomerBindingStarted) as CustomerBindingStarted;
    return change.customerBinding.paymentResource.paymentToolDetails;
};

const toDetailsDescription = (details: PaymentToolDetails): string => {
    switch (details.detailsType) {
        case PaymentToolDetailsType.PaymentToolDetailsBankCard:
            return toCardDescription(details as PaymentToolDetailsBankCard);
    }
    throw new Error('Unsupported PaymentToolDetailsType');
};

export const getCustomerPaymentDetails = (e: CustomerEvent[]): string => {
    const paymentToolDetails = getPaymentToolDetails(e);
    const description = toDetailsDescription(paymentToolDetails);
    switch (paymentToolDetails.detailsType) {
        case PaymentToolDetailsType.PaymentToolDetailsBankCard:
            return description;
    }
    throw new Error('Unsupported PaymentToolDetailsType');
};
