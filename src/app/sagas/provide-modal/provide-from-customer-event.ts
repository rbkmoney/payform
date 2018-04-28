import { put, PutEffect } from 'redux-saga/effects';
import last from 'lodash-es/last';
import {
    CustomerEvent,
    CustomerChangeType,
    CustomerBindingInteractionRequested
} from 'checkout/backend';
import { Direction, GoToFormInfo, SetModalState, TypeKeys } from 'checkout/actions';
import { ResultFormInfo, ResultType } from 'checkout/state';
import { provideCustomerInteraction } from './provide-interaction';

type SetStateFromEvents = GoToFormInfo | SetModalState;

const toPayload = (event: CustomerEvent): SetStateFromEvents => {
    const change = last(event.changes);
    switch (change.changeType) {
        case CustomerChangeType.CustomerBindingStatusChanged:
        case CustomerChangeType.CustomerBindingStarted:
            return {
                type: TypeKeys.GO_TO_FORM_INFO,
                payload: {
                    formInfo: new ResultFormInfo(ResultType.processed),
                    direction: Direction.forward
                }
            };
        case CustomerChangeType.CustomerBindingInteractionRequested:
            return {
                type: TypeKeys.SET_MODAL_STATE,
                payload: provideCustomerInteraction(change as CustomerBindingInteractionRequested)
            };
        default:
            throw {code: 'error.unsupported.invoice.change.type'};
    }
};

export function* provideFromCustomerEvent(event: CustomerEvent): Iterator<PutEffect<SetStateFromEvents>> {
    return yield put(toPayload(event));
}
