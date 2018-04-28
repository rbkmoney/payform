import { call, CallEffect, put, PutEffect, select, SelectEffect } from 'redux-saga/effects';
import {
    PaymentMethodsFormInfo,
    ModalForms,
    ModalState,
    ResultFormInfo,
    ResultType,
    CardFormInfo,
    FormInfo,
    PaymentMethod,
    ModelState,
    State,
    ConfigState
} from 'checkout/state';
import {
    CustomerBindingInteractionRequested,
    CustomerChangeType,
    InvoiceChangeType,
    PaymentInteractionRequested
} from 'checkout/backend';
import { getLastChange } from 'checkout/utils';
import { CustomerEvent, Event } from 'checkout/backend/model';
import { InitializeModalCompleted, TypeKeys } from 'checkout/actions';
import { initializeAvailablePaymentMethods } from './initialize-available-payment-methods';
import { IntegrationType } from 'checkout/config';
import { providePaymentInteraction } from '../../provide-modal';
import { provideCustomerInteraction } from 'checkout/sagas/provide-modal';

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
            return providePaymentInteraction(change as PaymentInteractionRequested);
        case InvoiceChangeType.InvoiceStatusChanged:
        case InvoiceChangeType.PaymentStatusChanged:
        case InvoiceChangeType.PaymentStarted:
            return toInitialModalResult();
        case InvoiceChangeType.InvoiceCreated:
            return toInitialInvoiceState(methods);
        default:
            throw {code: 'error.unhandled.invoice.change.type'};
    }
};

const initFromCustomerIntegration = (e: CustomerEvent[]): ModalState => {
    if (!e || e.length === 0) {
        return toInitialCustomerState();
    }
    const change = getLastChange(e);
    switch (change.changeType) {
        case CustomerChangeType.CustomerBindingInteractionRequested:
            return provideCustomerInteraction(change as CustomerBindingInteractionRequested);
        case CustomerChangeType.CustomerBindingStatusChanged:
            return toInitialCustomerState();
        case CustomerChangeType.CustomerBindingStarted:
            return toInitialModalResult();
    }
};

type Effects = SelectEffect | CallEffect | PutEffect<InitializeModalCompleted>;

export function* initializeModal(config: ConfigState, model: ModelState): Iterator<Effects> {
    let initializedModals;
    switch (config.initConfig.integrationType) {
        case IntegrationType.invoice:
        case IntegrationType.invoiceTemplate:
            yield call(initializeAvailablePaymentMethods, model.paymentMethods, config);
            const methods = yield select((state: State) => state.availablePaymentMethods);
            initializedModals = initFromInvoiceIntegration(model.invoiceEvents, methods);
            break;
        case IntegrationType.customer:
            initializedModals = initFromCustomerIntegration(model.customerEvents);
            break;
        default:
            throw {code: 'error.unsupported.integration.type'};
    }
    yield put({
        type: TypeKeys.INITIALIZE_MODAL_COMPLETED,
        payload: initializedModals
    } as InitializeModalCompleted);
}
