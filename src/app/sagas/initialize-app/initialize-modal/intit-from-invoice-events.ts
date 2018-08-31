import {
    InvoiceChangeType,
    PaymentInteractionRequested,
    PaymentStatusChanged,
    PaymentStatuses,
    InvoiceEvent
} from 'checkout/backend';
import { ModalState, PaymentMethod } from 'checkout/state';
import { PaymentMethodName } from 'checkout/config';
import { providePaymentInteraction } from '../../provide-modal';
import { toModalResult } from './to-modal-result';
import { toInitialState } from './to-initial-state';
import { getLastChange } from 'checkout/utils';

const initFormPaymentStatusChanged = (
    change: PaymentStatusChanged,
    methods: PaymentMethod[],
    initialPaymentMethod: PaymentMethodName
): ModalState => {
    switch (change.status) {
        case PaymentStatuses.captured:
        case PaymentStatuses.processed:
        case PaymentStatuses.pending:
        case PaymentStatuses.refunded:
            return toModalResult();
        case PaymentStatuses.cancelled:
        case PaymentStatuses.failed:
            return toInitialState(methods, initialPaymentMethod);
        default:
            throw { code: 'error.unsupported.payment.status' };
    }
};

export const initFromInvoiceEvents = (
    events: InvoiceEvent[],
    methods: PaymentMethod[],
    initialPaymentMethod: PaymentMethodName
): ModalState => {
    const change = getLastChange(events);
    switch (change.changeType) {
        case InvoiceChangeType.PaymentInteractionRequested:
            return providePaymentInteraction(change as PaymentInteractionRequested);
        case InvoiceChangeType.PaymentStarted:
        case InvoiceChangeType.InvoiceStatusChanged:
            return toModalResult();
        case InvoiceChangeType.PaymentStatusChanged:
            return initFormPaymentStatusChanged(change as PaymentStatusChanged, methods, initialPaymentMethod);
        case InvoiceChangeType.InvoiceCreated:
            return toInitialState(methods, initialPaymentMethod);
        default:
            throw { code: 'error.unsupported.invoice.change.type' };
    }
};
