import { LifecycleState } from 'checkout/state';
import {
    TypeKeys,
    ChangeStepStatus, ChangeStageStatus
} from 'checkout/actions';

type LifecycleReducerAction = ChangeStepStatus | ChangeStageStatus;

const initState = {
    initialization: {
        stageStatus: 'pristine'
    }
} as LifecycleState;

export function lifecycleReducer(s: LifecycleState = initState, action: LifecycleReducerAction): LifecycleState {
    switch (action.type) {
        case TypeKeys.LIFECYCLE_CHANGE_STEP_STATUS:
            return {
                ...s,
                initialization: {
                    ...s.initialization,
                    [action.meta.stepName]: action.payload
                }
            };
        case TypeKeys.LIFECYCLE_CHANGE_STAGE_STATUS:
            return {
                ...s,
                initialization: {
                    ...s.initialization,
                    stageStatus: action.payload
                }
            };
    }
    return s;
}
