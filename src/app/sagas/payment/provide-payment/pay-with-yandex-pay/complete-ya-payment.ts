import { select, SelectEffect } from 'redux-saga/effects';
import last from 'lodash-es/last';

import { isPaymentResultSuccess } from 'checkout/utils';
import { State } from 'checkout/state';

export function* completeYaPayment(yaPayment: YaPay.Payment): Iterator<SelectEffect> {
    const event = yield select((s: State) => last(s.events.events));
    if (isPaymentResultSuccess(event)) {
        yaPayment.complete(YaPay.CompleteReason.Success);
    } else {
        yaPayment.complete(YaPay.CompleteReason.Error, null);
    }
}
