import { AbstractAction, TypeKeys } from 'checkout/actions';
import { StepStatus } from 'checkout/lifecycle';

interface Meta {
    stageName: string;
    stepName: string;
}

export interface ChangeStepStatus extends AbstractAction<StepStatus, Meta> {
    type: TypeKeys.LIFECYCLE_CHANGE_STEP_STATUS;
    payload: StepStatus;
    meta: Meta;
}

export const changeStepStatus = (stageName: string, stepName: string, value: StepStatus): ChangeStepStatus => ({
    type: TypeKeys.LIFECYCLE_CHANGE_STEP_STATUS,
    payload: value,
    meta: {
        stageName,
        stepName
    }
});
