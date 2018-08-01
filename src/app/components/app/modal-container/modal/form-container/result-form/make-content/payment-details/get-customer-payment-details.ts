import {
    CustomerBindingStarted,
    CustomerChangeType,
    CustomerEvent,
    PaymentToolDetails,
    PaymentToolDetailsBankCard,
    PaymentToolDetailsType
} from 'checkout/backend';
import { findChange } from 'checkout/utils';
import { PaymentDetailsInfo } from './payment-details-info';
import { toCardInfo } from './details-to-info';

const getPaymentToolDetails = (e: CustomerEvent[]): PaymentToolDetails => {
    const change = findChange(e, CustomerChangeType.CustomerBindingStarted) as CustomerBindingStarted;
    return change.customerBinding.paymentResource.paymentToolDetails;
};

const toDetailsInfo = (details: PaymentToolDetails): string => {
    switch (details.detailsType) {
        case PaymentToolDetailsType.PaymentToolDetailsBankCard:
            return toCardInfo(details as PaymentToolDetailsBankCard);
    }
    throw new Error('Unsupported PaymentToolDetailsType');
};

export const getCustomerPaymentDetails = (e: CustomerEvent[]): PaymentDetailsInfo => {
    const details = getPaymentToolDetails(e);
    const info = toDetailsInfo(details);
    return { type: details.detailsType, info };
};
