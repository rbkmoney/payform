import { FormContainerProps } from '../form-container-props';
import { FormFlowItem } from 'checkout/form-flow';
import { resolveStage, StepStatus } from 'checkout/lifecycle';
import { resolveEvents } from './card-pay/resolve-events';

const stageName = 'cardPayment';

export const getPaymentResult = (p: FormContainerProps, i: FormFlowItem) => {
    const shortened = resolveStage.bind(null, p.cardPayment, p.changeStepStatus, stageName);
    resolveEvents(shortened, p, p.cardPayment.pollEvents === StepStatus.suspend);
};
