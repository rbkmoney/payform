export type StepStatus = 'started' | 'done';

export type StageStatus = 'pristine' | 'started' | 'ready' | 'processed';

export class InitializationStage {
    stageStatus: StageStatus;
    receiveAppConfig: StepStatus;
    receiveLocale: StepStatus;
    receivePaymentSubject: StepStatus;
    receivePaymentMethods: StepStatus;
}
