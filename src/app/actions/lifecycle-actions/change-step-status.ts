import { AbstractAction, TypeKeys } from 'checkout/actions';
import { StepStatus } from 'checkout/state';

export type StepName =
    'stageStatus' |
    'receiveAppConfig' |
    'receiveLocale' |
    'receivePaymentSubject' |
    'receivePaymentMethods';

interface Meta {
    stepName: StepName;
}

export interface ChangeStepStatus extends AbstractAction<StepStatus, Meta> {
    type: TypeKeys.LIFECYCLE_CHANGE_STEP_STATUS;
    payload: StepStatus;
    meta: Meta;
}

export const changeStepStatus = (stepName: StepName, value: StepStatus): ChangeStepStatus => ({
    type: TypeKeys.LIFECYCLE_CHANGE_STEP_STATUS,
    payload: value,
    meta: {
        stepName
    }
});
