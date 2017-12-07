export type StepStatus = 'started' | 'done';

export class InitializationStage {
    stageStart: boolean;
    receiveAppConfig: StepStatus;
    receiveLocale: StepStatus;
    receivePaymentSubject: StepStatus;
    checkPaymentSubject: StepStatus;
    receivePaymentMethods: StepStatus;
    initFormsFlow: boolean;
    stageDone: boolean;
}
