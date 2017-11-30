import { LifecycleState } from 'checkout/state';
import { GetAppConfigAction, GetInvoiceTemplateAction, TypeKeys } from 'checkout/actions';

type LifecycleReducerAction = GetInvoiceTemplateAction | GetAppConfigAction;

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
        case TypeKeys.GET_INVOICE_TEMPLATE:
            return {
                ...s,
                initialization: {
                    ...s.initialization,
                    modelReceived: true
                }
            };
    }
    return s;
}
