import { put, PutEffect } from 'redux-saga/effects';
import last from 'lodash-es/last';
import {
    CustomerEvent,
    CustomerChangeType,
    InteractionType,
    Redirect,
    CustomerBindingInteractionRequested
} from 'checkout/backend';
import { Direction, GoToFormInfo, SetModalState, TypeKeys } from 'checkout/actions';
import {
    ModalInteraction,
    ModalState,
    ResultFormInfo,
    ResultType
} from 'checkout/state';

export type SetStateFromEvents = GoToFormInfo | SetModalState;

const interactionToModalState = (change: CustomerBindingInteractionRequested): ModalState => {
    const {userInteraction} = change;
    switch (userInteraction.interactionType) {
        case InteractionType.Redirect:
            return new ModalInteraction((userInteraction as Redirect).request, true);
        default:
            throw {code: 'error.unsupported.user.interaction.type'};
    }
};

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
                payload: interactionToModalState(change as CustomerBindingInteractionRequested)
            };
        default:
            throw {code: 'error.unsupported.invoice.change.type'};
    }
};

export function* provideModal(event: CustomerEvent): Iterator<PutEffect<SetStateFromEvents>> {
    return yield put(toPayload(event));
}
