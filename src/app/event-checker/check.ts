import { last } from 'lodash';
import {
    ChangeType,
    Event,
    InvoiceStatusChanged,
    InvoiceStatuses,
    PaymentInteractionRequested,
    PaymentStatusChanged, PaymentStatuses
} from 'checkout/backend';
import { Type } from './type';
import { EventCheckResult } from './event-check-result';

const checkPaymentStatusChanged = (change: PaymentStatusChanged): EventCheckResult => {
    switch (change.status) {
        case PaymentStatuses.processed:
            return {type: Type.success, change};
        case PaymentStatuses.failed:
        case PaymentStatuses.cancelled:
            return {type: Type.failed, change};
        // TODO need handle other types
    }
};

const checkPaymentInteractionRequested = (change: PaymentInteractionRequested): EventCheckResult =>
    ({type: Type.interaction, change});

const checkInvoiceStatusChanged = (change: InvoiceStatusChanged): EventCheckResult => {
    switch (change.status) {
        case InvoiceStatuses.paid:
            return {type: Type.success, change};
        case InvoiceStatuses.cancelled:
        case InvoiceStatuses.fulfilled:
            return {type: Type.failed, change};
    }
};

export const check = (e: Event[]): EventCheckResult => {
    const lastEvent = last(e);
    if (lastEvent) {
        const change = last(lastEvent.changes);
        switch (change.changeType) {
            case ChangeType.PaymentStatusChanged:
                return checkPaymentStatusChanged(change as PaymentStatusChanged);
            case ChangeType.PaymentInteractionRequested:
                return checkPaymentInteractionRequested(change as PaymentInteractionRequested);
            case ChangeType.InvoiceStatusChanged:
                return checkInvoiceStatusChanged(change as InvoiceStatusChanged);
        }
    }
    return {type: Type.unexplained};
};
