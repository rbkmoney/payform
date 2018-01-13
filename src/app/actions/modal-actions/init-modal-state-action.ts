import { ChangeType, Event } from 'checkout/backend';
import {
    PaymentMethodsFormInfo,
    ModalForms,
    ModalState,
    ModelState,
    ResultFormInfo,
    ModalInteraction,
    ResultType
} from 'checkout/state';
import { checkLastChange } from 'checkout/form-flow';
import { TypeKeys } from 'checkout/actions';
import { SetModalState } from './set-modal-state';
import { InitConfig } from 'checkout/config';
import { toCardFormInfo, toRequest } from './converters';

const isMultiMethods = (c: InitConfig, m: ModelState) => c.terminals && m.paymentMethods.length > 1;

const toInitialState = (c: InitConfig, m: ModelState): ModalState => {
    const formInfo = isMultiMethods(c, m) ? new PaymentMethodsFormInfo() : toCardFormInfo(c, m.invoiceTemplate);
    return new ModalForms(formInfo);
};

const prepareModalResult = (): ModalState => {
    const formInfo = new ResultFormInfo(ResultType.processed);
    return new ModalForms(formInfo);
};

const prepareModalInteraction = (events: Event[]) => new ModalInteraction(toRequest(events));

const preparePayload = (c: InitConfig, m: ModelState): ModalState => {
    const events = m.invoiceEvents;
    if (!events || events.length === 0) {
        return toInitialState(c, m);
    }
    prepareFromEvents(m.invoiceEvents); // TODO fix it
    return toInitialState(c, m);
};

const prepareFromEvents = (events: Event[]): ModalState => {
    const check = checkLastChange.bind(null, events, 0);
    if (check(ChangeType.PaymentInteractionRequested)) {
        return prepareModalInteraction(events);
    } else if (check(ChangeType.InvoiceStatusChanged) || check(ChangeType.PaymentStatusChanged)) {
        return prepareModalResult();
    }
};

export const initModalState = (config: InitConfig, model: ModelState): SetModalState => ({
    type: TypeKeys.SET_MODAL_STATE,
    payload: preparePayload(config, model)
});

export const setModalStateFromEvents = (events: Event[]): SetModalState => ({
    type: TypeKeys.SET_MODAL_STATE,
    payload: prepareFromEvents(events)
});
