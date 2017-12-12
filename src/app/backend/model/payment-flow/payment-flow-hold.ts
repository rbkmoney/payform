import { PaymentFlow } from './payment-flow';
import { FlowType } from './flow-type';

export class PaymentFlowHold extends PaymentFlow {
    type: FlowType.PaymentFlowHold;
    onHoldExpiration: 'cancel' | 'capture';
}
