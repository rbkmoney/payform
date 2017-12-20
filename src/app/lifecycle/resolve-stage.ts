import { ChangeStepStatus } from 'checkout/actions';
import { StepStatus } from 'checkout/lifecycle';

export const resolveStage = (stage: any,
                             statusChanger: (stageName: string, stepName: string, value: StepStatus) => ChangeStepStatus,
                             stageName: string,
                             stepName: string,
                             action: () => any,
                             doneCondition: boolean,
                             startCondition: boolean = true,
                             retryCondition: boolean = false) => {
    const isNotStarted = !stage[stepName];
    if (startCondition && (isNotStarted || retryCondition)) {
        action();
        statusChanger(stageName, stepName, StepStatus.started);
    }
    if (stage[stepName] === StepStatus.started && doneCondition) {
        statusChanger(stageName, stepName, StepStatus.done);
    }
};
