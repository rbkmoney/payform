import { put, PutEffect } from 'redux-saga/effects';
import last from 'lodash-es/last';
import {
    Event,
    InvoiceChangeType,
    PaymentInteractionRequested,
} from 'checkout/backend';
import {
    Direction,
    GoToFormInfo,
    TypeKeys,
    SetModalState
} from 'checkout/actions';
import {
    ResultFormInfo,
    ResultType
} from 'checkout/state';
import { providePaymentInteraction } from './provide-interaction';

type SetStateFromEvents = GoToFormInfo | SetModalState;

const toPayload = (event: Event): SetStateFromEvents => {
    const change = last(event.changes);
    switch (change.changeType) {
        case InvoiceChangeType.PaymentStatusChanged:
        case InvoiceChangeType.InvoiceStatusChanged:
            return {
                type: TypeKeys.GO_TO_FORM_INFO,
                payload: {
                    formInfo: new ResultFormInfo(ResultType.processed),
                    direction: Direction.forward
                }
            };
        case InvoiceChangeType.PaymentInteractionRequested:
            return {
                type: TypeKeys.SET_MODAL_STATE,
                payload: providePaymentInteraction(change as PaymentInteractionRequested)
            };
        default:
            throw {code: 'error.unsupported.invoice.change.type'};
    }
};

export function* provideFromInvoiceEvent(event: Event): Iterator<PutEffect<SetStateFromEvents>> {
    return yield put(toPayload(event));
}
