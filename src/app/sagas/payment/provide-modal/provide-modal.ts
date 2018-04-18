import { put, PutEffect } from 'redux-saga/effects';
import last from 'lodash-es/last';
import { Event, InvoiceChangeType } from 'checkout/backend';
import { Direction, GoToFormInfo, GoToPayload, TypeKeys } from 'checkout/actions';
import { ResultFormInfo, ResultType } from 'checkout/state';

const toPayload = (event: Event): GoToPayload => {
    const change = last(event.changes);
    switch (change.changeType) {
        case InvoiceChangeType.PaymentStatusChanged:
        case InvoiceChangeType.InvoiceStatusChanged:
            return {
                formInfo: new ResultFormInfo(ResultType.processed),
                direction: Direction.forward
            };
        default:
            throw {code: 'unsupported.invoice.change.type'};
    }
};

export function* provideModal(event: Event): Iterator<PutEffect<GoToFormInfo>> {
    return yield put({
        type: TypeKeys.GO_TO_FORM_INFO,
        payload: toPayload(event)
    } as GoToFormInfo);
}
