import { put, PutEffect } from 'redux-saga/effects';
import last from 'lodash-es/last';
import {
    Event,
    InvoiceChangeType,
    PaymentInteractionRequested,
    InteractionType,
    Redirect,
    PaymentTerminalReceipt
} from 'checkout/backend';
import {
    Direction,
    GoToFormInfo,
    TypeKeys,
    SetModalState
} from 'checkout/actions';
import {
    InteractionFormInfo,
    ModalForms,
    ModalInteraction,
    ModalState,
    ResultFormInfo,
    ResultType
} from 'checkout/state';

const interactionToModalState = (change: PaymentInteractionRequested): ModalState => {
    const {userInteraction} = change;
    switch (userInteraction.interactionType) {
        case InteractionType.Redirect:
            return new ModalInteraction((userInteraction as Redirect).request, true);
        case InteractionType.PaymentTerminalReceipt:
            const formInfo = new InteractionFormInfo(userInteraction as PaymentTerminalReceipt);
            return new ModalForms([formInfo], true);
        default:
            throw {code: 'error.unsupported.user.interaction.type'};
    }
};

export type SetStateFromEvents = GoToFormInfo | SetModalState;

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
                payload: interactionToModalState(change as PaymentInteractionRequested)
            };
        default:
            throw {code: 'error.unsupported.invoice.change.type'};
    }
};

export function* provideModal(event: Event): Iterator<PutEffect<SetStateFromEvents>> {
    return yield put(toPayload(event));
}
