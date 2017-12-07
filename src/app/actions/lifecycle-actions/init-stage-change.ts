import { AbstractAction, TypeKeys } from 'checkout/actions';
import { StepStatus } from 'checkout/state';

export type StepName =
    'stageStart' |
    'receiveAppConfig' |
    'receiveLocale' |
    'receivePaymentSubject' |
    'checkPaymentSubject' |
    'receivePaymentMethods' |
    'initFormsFlow' |
    'stageDone';

interface Meta {
    stepName: StepName;
}

export interface InitStageChange extends AbstractAction<StepStatus | boolean, Meta> {
    type: TypeKeys.INIT_STAGE_CHANGE;
    payload: StepStatus | boolean;
    meta: Meta;
}

export const changeStepStatus = (stepName: StepName, value: StepStatus | boolean): InitStageChange => ({
    type: TypeKeys.INIT_STAGE_CHANGE,
    payload: value,
    meta: {
        stepName
    }
});
