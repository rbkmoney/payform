import { put, call, CallEffect, PutEffect } from 'redux-saga/effects';
import last from 'lodash-es/last';
import { InvoiceEvent, InvoiceChangeType, PaymentInteractionRequested } from 'checkout/backend';
import { Direction, GoToFormInfo, TypeKeys, SetModalState } from 'checkout/actions';
import { ResultFormInfo, ResultType } from 'checkout/state';
import { providePaymentInteraction } from './provide-interaction';

type SetStateFromEvents = GoToFormInfo | SetModalState;

function* toPayload(event: InvoiceEvent): IterableIterator<CallEffect | SetStateFromEvents> {
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
                payload: yield call(providePaymentInteraction, change as PaymentInteractionRequested)
            };
        default:
            throw { code: 'error.unsupported.invoice.change.type' };
    }
}

export function* provideFromInvoiceEvent(
    event: InvoiceEvent
): IterableIterator<CallEffect | PutEffect<SetStateFromEvents>> {
    const payload = yield call(toPayload, event);
    return yield put<SetStateFromEvents>(payload);
}
