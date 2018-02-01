import { ResultFormInfo, ResultType } from 'checkout/state';
import { Direction, GoToFormInfo, TypeKeys, toInteraction } from 'checkout/actions';
import { InvoiceChangeType, Event, CustomerEvent, CustomerChangeType } from 'checkout/backend';
import { SetModalState } from './set-modal-state';
import { getLastChange } from 'checkout/utils';

const prepareFromEvents = (events: Event[] | CustomerEvent[]): SetStateFromEvents => {
    const change = getLastChange(events);
    switch (change.changeType) {
        case InvoiceChangeType.PaymentInteractionRequested:
        case CustomerChangeType.CustomerBindingInteractionRequested:
            return {
                type: TypeKeys.SET_MODAL_STATE,
                payload: toInteraction(events)
            };
        case InvoiceChangeType.PaymentStatusChanged:
        case InvoiceChangeType.InvoiceStatusChanged:
        case CustomerChangeType.CustomerBindingStatusChanged:
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

export const setModalFromEvents = (events: Event[] | CustomerEvent[]): SetStateFromEvents => prepareFromEvents(events);
