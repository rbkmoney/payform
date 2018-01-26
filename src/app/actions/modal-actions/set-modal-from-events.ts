import { ResultFormInfo, ResultType } from 'checkout/state';
import { Direction, GoToFormInfo, TypeKeys } from 'checkout/actions';
import { ChangeType, Event } from 'checkout/backend';
import { SetModalState } from './set-modal-state';
import { toModalInteraction } from './converters';
import { getLastChange } from 'checkout/utils';

const prepareFromEvents = (events: Event[]): SetStateFromEvents => {
    const change = getLastChange(events);
    switch (change.changeType) {
        case ChangeType.PaymentInteractionRequested:
            return {
                type: TypeKeys.SET_MODAL_STATE,
                payload: toModalInteraction(events)
            };
        case ChangeType.PaymentStatusChanged:
        case ChangeType.InvoiceStatusChanged:
            return {
                type: TypeKeys.GO_TO_FORM_INFO,
                payload: {
                    formInfo: new ResultFormInfo(ResultType.processed),
                    direction: Direction.forward
                }
            };
    }
    throw new Error('Unhandled invoice changeType');
};

export type SetStateFromEvents = GoToFormInfo | SetModalState;

export const setModalFromEvents = (events: Event[]): SetStateFromEvents => prepareFromEvents(events);
