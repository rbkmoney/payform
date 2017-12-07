import { LifecycleState } from 'checkout/state';
import {
    TypeKeys,
    InitStageChange
} from 'checkout/actions';

type LifecycleReducerAction = InitStageChange;

const initState = {
    initialization: {
        stageDone: false
    }
} as LifecycleState;

export function lifecycleReducer(s: LifecycleState = initState, action: LifecycleReducerAction): LifecycleState {
    switch (action.type) {
        case TypeKeys.INIT_STAGE_CHANGE:
            return {
                ...s,
                initialization: {
                    ...s.initialization,
                    [action.meta.stepName]: action.payload
                }
            };
    }
    return s;
}
