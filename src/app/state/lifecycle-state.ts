import { InitializationStage } from '../lifecycle/initialization-stage';
import { CardPaymentStage } from 'checkout/lifecycle';

export type LifecycleState = {
    readonly initialization: InitializationStage;
    readonly cardPayment: CardPaymentStage;
}
