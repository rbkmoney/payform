import { ResultFormInfo, ResultType } from 'checkout/state';
import { SetFormInfo, TypeKeys } from 'checkout/actions';
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
                type: TypeKeys.SET_FORM_INFO,
                payload: new ResultFormInfo(ResultType.processed, true)
            };
    }
    throw new Error('Unhandled invoice changeType');
};

export type SetStateFromEvents = SetFormInfo | SetModalState;

export const setModalFromEvents = (events: Event[]): SetStateFromEvents => prepareFromEvents(events);
