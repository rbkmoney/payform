import { last } from 'lodash';
import {
    ChangeType,
    Event,
    InvoiceStatusChanged,
    PaymentInteractionRequested,
    PaymentStatusChanged
} from 'checkout/backend';
import { Type } from './type';
import { EventCheckResult } from './event-check-result';

const checkPaymentStatusChanged = (change: PaymentStatusChanged): EventCheckResult => {
    switch (change.status) {
        case 'processed':
            return {type: Type.success};
        case 'failed':
        case 'cancelled':
            return {type: Type.failed, change};
    }
};

const checkPaymentInteractionRequested = (change: PaymentInteractionRequested): EventCheckResult =>
    ({type: Type.interaction, change});

const checkInvoiceStatusChanged = (change: InvoiceStatusChanged): EventCheckResult => {
    switch (change.status) {
        case 'paid':
        case 'cancelled':
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
