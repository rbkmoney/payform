import { PaymentFlow } from './payment-flow';
import { FlowType } from './flow-type';
import { HoldExpirationType } from './hold-expiration-type';

export class PaymentFlowHold extends PaymentFlow {
    type: FlowType.PaymentFlowHold;
    onHoldExpiration: HoldExpirationType;
}
