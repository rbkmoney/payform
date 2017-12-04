import { LifecycleState } from 'checkout/state';
import {
    GetAppConfigAction,
    GetInvoiceAction,
    GetInvoiceTemplateAction,
    InitStageStartAction,
    TypeKeys,
    InitStageDoneAction,
    GetInvoicePaymentMethodsAction,
    GetInvoicePaymentMethodsByTemplateIdAction,
    GetLocaleAction
} from 'checkout/actions';

type LifecycleReducerAction =
    GetInvoiceTemplateAction |
    GetAppConfigAction |
    GetLocaleAction |
    InitStageStartAction |
    InitStageDoneAction |
    GetInvoiceAction |
    GetInvoicePaymentMethodsAction |
    GetInvoicePaymentMethodsByTemplateIdAction;

const initState = {
    initialization: {
        stageDone: false
    }
} as LifecycleState;

export function lifecycleReducer(s: LifecycleState = initState, action: LifecycleReducerAction): LifecycleState {
    switch (action.type) {
        case TypeKeys.GET_APP_CONFIG:
            return {
                ...s,
                initialization: {
                    ...s.initialization,
                    appConfigReceived: true
                }
            };
        case TypeKeys.GET_LOCALE:
            return {
                ...s,
                initialization: {
                    ...s.initialization,
                    localeReceived: true
                }
            };
        case TypeKeys.GET_INVOICE_TEMPLATE:
            return {
                ...s,
                initialization: {
                    ...s.initialization,
                    modelReceived: true
                }
            };
        case TypeKeys.GET_INVOICE:
            return {
                ...s,
                initialization: {
                    ...s.initialization,
                    modelReceived: true
                }
            };
        case TypeKeys.GET_INVOICE_PAYMENT_METHODS:
            return {
                ...s,
                initialization: {
                    ...s.initialization,
                    paymentMethodsReceived: true
                }
            };
        case TypeKeys.GET_INVOICE_PAYMENT_METHODS_BY_TEMPLATE_ID:
            return {
                ...s,
                initialization: {
                    ...s.initialization,
                    paymentMethodsReceived: true
                }
            };
        case TypeKeys.INIT_STAGE_START:
            return {
                ...s,
                initialization: {
                    ...s.initialization,
                    stageStart: true
                }
            };
        case TypeKeys.INIT_STAGE_DONE:
            return {
                ...s,
                initialization: {
                    ...s.initialization,
                    stageDone: true
                }
            };
    }
    return s;
}
