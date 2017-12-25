import { StageStatus, StepStatus } from 'src/app/lifecycle/index';

export class InitializationStage {
    stageStatus: StageStatus;
    receiveAppConfig: StepStatus;
    receiveLocale: StepStatus;
    receivePaymentSubject: StepStatus;
    receivePaymentMethods: StepStatus;
}
