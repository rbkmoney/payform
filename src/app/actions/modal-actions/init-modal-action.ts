import { ChangeType, PaymentMethod, PaymentMethodName } from 'checkout/backend';
import {
    PaymentMethodsFormInfo,
    ModalForms,
    ModalState,
    ModelState,
    ResultFormInfo,
    ResultType,
    CardFormInfo
} from 'checkout/state';
import { TypeKeys } from 'checkout/actions';
import { SetModalState } from './set-modal-state';
import { InitConfig } from 'checkout/config';
import { toModalInteraction } from './converters';
import { getLastChange } from 'checkout/utils';

const checkPaymentMethodsConfig = (c: InitConfig, methods: PaymentMethod[]): boolean =>
    methods.reduce((acc, current): boolean => {
        switch (current.method) {
            case PaymentMethodName.PaymentTerminal:
                return acc;
            case PaymentMethodName.DigitalWallet:
                return acc || c.wallets;
        }
    }, false);

const isMultiMethods = (c: InitConfig, m: ModelState) =>
    m.paymentMethods.length > 1 && checkPaymentMethodsConfig(c, m.paymentMethods);

const toInitialState = (c: InitConfig, m: ModelState): ModalState => {
    const formInfo = isMultiMethods(c, m) ? new PaymentMethodsFormInfo() : new CardFormInfo();
    return new ModalForms([formInfo], true);
};

const toInitialModalResult = (): ModalState => {
    const formInfo = new ResultFormInfo(ResultType.processed);
    return new ModalForms([formInfo], true);
};

const toInitPayload = (c: InitConfig, m: ModelState): ModalState => {
    const events = m.invoiceEvents;
    if (!events || events.length === 0) {
        return toInitialState(c, m);
    }
    const change = getLastChange(events);
    switch (change.changeType) {
        case ChangeType.PaymentInteractionRequested:
            return toModalInteraction(events);
        case ChangeType.InvoiceStatusChanged:
            return toInitialModalResult();
        case ChangeType.PaymentStatusChanged:
        case ChangeType.InvoiceCreated:
            return toInitialState(c, m);
        case ChangeType.PaymentStarted:
            throw new Error('Unhandled invoice PaymentStarted');
    }
    throw new Error('Unhandled invoice changeType');
};

export const initModal = (config: InitConfig, model: ModelState): SetModalState => ({
    type: TypeKeys.SET_MODAL_STATE,
    payload: toInitPayload(config, model)
});
