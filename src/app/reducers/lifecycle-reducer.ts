import { LifecycleState } from 'checkout/state';
import {
    TypeKeys,
    ChangeStepStatus,
    ChangeStageStatus,
    ResetStage
} from 'checkout/actions';

type LifecycleReducerAction = ChangeStepStatus | ChangeStageStatus | ResetStage;

const initState = {
    initialization: {
        stageStatus: 'pristine'
    },
    cardPayment: {
        stageStatus: 'pristine'
    }
} as LifecycleState;

export function lifecycleReducer(s: LifecycleState = initState, action: LifecycleReducerAction): LifecycleState {
    switch (action.type) {
        case TypeKeys.LIFECYCLE_CHANGE_STEP_STATUS:
            return {
                ...s,
                [action.meta.stageName]: {
                    ...(s as any)[action.meta.stageName],
                    [action.meta.stepName]: action.payload
                }
            };
        case TypeKeys.LIFECYCLE_CHANGE_STAGE_STATUS:
            return {
                ...s,
                [action.meta.stageName]: {
                    ...(s as any)[action.meta.stageName],
                    stageStatus: action.payload
                }
            };
        case TypeKeys.LIFECYCLE_RESET_STAGE:
            return {
                ...s,
                [action.meta.stageName]: {
                    stageStatus: 'pristine'
                }
            };
    }
    return s;
}
