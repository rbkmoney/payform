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
    PaymentInteractionRequested,
    PaymentStatusChanged,
    PaymentStatuses
} from 'checkout/backend';
import { getLastChange } from 'checkout/utils';
import { CustomerEvent, Event } from 'checkout/backend/model';
import { InitializeModalCompleted, TypeKeys } from 'checkout/actions';
import { initializeAvailablePaymentMethods } from './initialize-available-payment-methods';
import { IntegrationType } from 'checkout/config';
import { providePaymentInteraction } from '../../provide-modal';
import { provideCustomerInteraction } from 'checkout/sagas/provide-modal';

const toInitialModal = (formInfo: FormInfo) => new ModalForms([formInfo], true);

const toInitialState = (methods: PaymentMethod[]): ModalState => {
    const formInfo = methods.length > 1 ? new PaymentMethodsFormInfo() : new CardFormInfo();
    return toInitialModal(formInfo);
};

const toInitialCustomerState = () => toInitialModal(new CardFormInfo());

const toModalResult = (): ModalState => toInitialModal(new ResultFormInfo(ResultType.processed));

const initFormPaymentStatusChanged = (change: PaymentStatusChanged, methods: PaymentMethod[]): ModalState => {
    switch (change.status) {
        case PaymentStatuses.captured:
        case PaymentStatuses.processed:
        case PaymentStatuses.pending:
        case PaymentStatuses.refunded:
            return toModalResult();
        case PaymentStatuses.cancelled:
        case PaymentStatuses.failed:
            return toInitialState(methods);
        default:
            throw {code: 'error.unsupported.payment.status'};
    }
};

const initFromInvoiceEvents = (events: Event[], methods: PaymentMethod[]): ModalState => {
    const change = getLastChange(events);
    switch (change.changeType) {
        case InvoiceChangeType.PaymentInteractionRequested:
            return providePaymentInteraction(change as PaymentInteractionRequested);
        case InvoiceChangeType.PaymentStarted:
        case InvoiceChangeType.InvoiceStatusChanged:
            return toModalResult();
        case InvoiceChangeType.PaymentStatusChanged:
            return initFormPaymentStatusChanged(change as PaymentStatusChanged, methods);
        case InvoiceChangeType.InvoiceCreated:
            return toInitialState(methods);
        default:
            throw {code: 'error.unsupported.invoice.change.type'};
    }
};

const initFromCustomerEvents = (events: CustomerEvent[]): ModalState => {
    if (!events || events.length === 0) {
        return toInitialCustomerState();
    }
    const change = getLastChange(events);
    switch (change.changeType) {
        case CustomerChangeType.CustomerBindingInteractionRequested:
            return provideCustomerInteraction(change as CustomerBindingInteractionRequested);
        case CustomerChangeType.CustomerBindingStatusChanged:
            return toInitialCustomerState();
        case CustomerChangeType.CustomerBindingStarted:
            return toModalResult();
    }
};

function* initAvailableMethods(config: ConfigState, model: ModelState): Iterator<CallEffect | SelectEffect> {
    yield call(initializeAvailablePaymentMethods, model.paymentMethods, config);
    return yield select((state: State) => state.availablePaymentMethods);
}

function* initInvoiceTemplate(config: ConfigState, model: ModelState): Iterator<CallEffect | ModalState> {
    const methods = yield call(initAvailableMethods, config, model);
    return toInitialState(methods);
}

function* initInvoice(config: ConfigState, model: ModelState): Iterator<CallEffect | ModalState> {
    const methods = yield call(initAvailableMethods, config, model);
    return initFromInvoiceEvents(model.invoiceEvents, methods);
}

type Effects = CallEffect | PutEffect<InitializeModalCompleted>;

export function* initializeModal(config: ConfigState, model: ModelState): Iterator<Effects> {
    let initializedModals;
    switch (config.initConfig.integrationType) {
        case IntegrationType.invoiceTemplate:
            initializedModals = yield call(initInvoiceTemplate, config, model);
            break;
        case IntegrationType.invoice:
            initializedModals = yield call(initInvoice, config, model);
            break;
        case IntegrationType.customer:
            initializedModals = initFromCustomerEvents(model.customerEvents);
            break;
        default:
            throw {code: 'error.unsupported.integration.type'};
    }
    yield put({
        type: TypeKeys.INITIALIZE_MODAL_COMPLETED,
        payload: initializedModals
    } as InitializeModalCompleted);
}
