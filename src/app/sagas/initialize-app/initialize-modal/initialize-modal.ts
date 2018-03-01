import {
    PaymentMethodsFormInfo,
    ModalForms,
    ModalState,
    ModelState,
    ResultFormInfo,
    ResultType,
    CardFormInfo,
    FormInfo
} from 'checkout/state';
import { InitConfig, IntegrationType } from 'checkout/config';
import { CustomerChangeType, InvoiceChangeType } from 'checkout/backend';
import { getLastChange } from 'checkout/utils';
import { toInteraction } from './to-interaction';
import { isMultiMethods } from './is-multi-methods';

const toInitialModal = (formInfo: FormInfo) => new ModalForms([formInfo], true);

const toInitialInvoiceState = (c: InitConfig, m: ModelState): ModalState => {
    const formInfo = isMultiMethods(c, m) ? new PaymentMethodsFormInfo() : new CardFormInfo();
    return toInitialModal(formInfo);
};

const toInitialCustomerState = () => toInitialModal(new CardFormInfo());

const toInitialModalResult = (): ModalState => toInitialModal(new ResultFormInfo(ResultType.processed));

const initFromInvoiceIntegration = (c: InitConfig, m: ModelState): ModalState => {
    const events = m.invoiceEvents;
    if (!events || events.length === 0) {
        return toInitialInvoiceState(c, m);
    }
    const change = getLastChange(events);
    switch (change.changeType) {
        case InvoiceChangeType.PaymentInteractionRequested:
            return toInteraction(events);
        case InvoiceChangeType.InvoiceStatusChanged:
            return toInitialModalResult();
        case InvoiceChangeType.PaymentStatusChanged:
        case InvoiceChangeType.InvoiceCreated:
            return toInitialInvoiceState(c, m);
        case InvoiceChangeType.PaymentStarted:
            return toInitialModalResult();
    }
    throw new Error('Unhandled invoice changeType');
};

const initFromCustomerIntegration = (c: InitConfig, m: ModelState): ModalState => {
    const events = m.customerEvents;
    if (!events || events.length === 0) {
        return toInitialCustomerState();
    }
    const change = getLastChange(events);
    switch (change.changeType) {
        case CustomerChangeType.CustomerBindingInteractionRequested:
            return toInteraction(events);
        case CustomerChangeType.CustomerBindingStatusChanged:
            return toInitialCustomerState();
        case CustomerChangeType.CustomerBindingStarted:
            return toInitialModalResult();
    }
};

export const initializeModal = (c: InitConfig, m: ModelState): ModalState => {
    switch (c.integrationType) {
        case IntegrationType.invoice:
        case IntegrationType.invoiceTemplate:
            return initFromInvoiceIntegration(c, m);
        case IntegrationType.customer:
            return initFromCustomerIntegration(c, m);
    }
};
