import { StepStatus } from './step-status';
import { Stage } from './stage';

export class CardPaymentStage extends Stage {
    createInvoice: StepStatus;
    createPaymentResource: StepStatus;
    createPayment: StepStatus;
    pollEvents: StepStatus;
}
