import {
    PaymentMethodsFormInfo,
    ModalForms,
    ModalState,
    ModelState,
    ResultFormInfo,
    ResultType,
    CardFormInfo,
    FormInfo,
    PaymentMethod
} from 'checkout/state';
import { InitConfig, IntegrationType } from 'checkout/config';
import { CustomerChangeType, InvoiceChangeType } from 'checkout/backend';
import { getLastChange } from 'checkout/utils';
import { toInteraction } from './to-interaction';
import { CustomerEvent, Event } from 'checkout/backend/model';

const toInitialModal = (formInfo: FormInfo) => new ModalForms([formInfo], true);

const toInitialInvoiceState = (methods: PaymentMethod[]): ModalState => {
    const formInfo = methods.length > 1 ? new PaymentMethodsFormInfo() : new CardFormInfo();
    return toInitialModal(formInfo);
};

const toInitialCustomerState = () => toInitialModal(new CardFormInfo());

const toInitialModalResult = (): ModalState => toInitialModal(new ResultFormInfo(ResultType.processed));

const initFromInvoiceIntegration = (e: Event[], methods: PaymentMethod[]): ModalState => {
    if (!e || e.length === 0) {
        return toInitialInvoiceState(methods);
    }
    const change = getLastChange(e);
    switch (change.changeType) {
        case InvoiceChangeType.PaymentInteractionRequested:
            return toInteraction(e);
        case InvoiceChangeType.InvoiceStatusChanged:
            return toInitialModalResult();
        case InvoiceChangeType.PaymentStatusChanged:
        case InvoiceChangeType.InvoiceCreated:
            return toInitialInvoiceState(methods);
        case InvoiceChangeType.PaymentStarted:
            return toInitialModalResult();
    }
    throw new Error('Unhandled invoice changeType');
};

const initFromCustomerIntegration = (e: CustomerEvent[]): ModalState => {
    if (!e || e.length === 0) {
        return toInitialCustomerState();
    }
    const change = getLastChange(e);
    switch (change.changeType) {
        case CustomerChangeType.CustomerBindingInteractionRequested:
            return toInteraction(e);
        case CustomerChangeType.CustomerBindingStatusChanged:
            return toInitialCustomerState();
        case CustomerChangeType.CustomerBindingStarted:
            return toInitialModalResult();
    }
};

export const initializeModal = (c: InitConfig, m: ModelState, methods: PaymentMethod[]): ModalState => {
    switch (c.integrationType) {
        case IntegrationType.invoice:
        case IntegrationType.invoiceTemplate:
            return initFromInvoiceIntegration(m.invoiceEvents, methods);
        case IntegrationType.customer:
            return initFromCustomerIntegration(m.customerEvents);
    }
};
