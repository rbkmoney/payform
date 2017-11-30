import { LifecycleState } from 'checkout/state';
import { GetAppConfigAction, GetInvoiceTemplateAction, TypeKeys } from 'checkout/actions';
import { InitStageDoneAction } from 'checkout/actions/lifecycle-actions';

type LifecycleReducerAction = GetInvoiceTemplateAction | GetAppConfigAction | InitStageDoneAction;

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
