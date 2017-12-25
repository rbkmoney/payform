import { PaymentFlow } from './payment-flow';
import { FlowType } from './flow-type';

export class PaymentFlowInstant extends PaymentFlow {
    type: FlowType.PaymentFlowInstant;
}
