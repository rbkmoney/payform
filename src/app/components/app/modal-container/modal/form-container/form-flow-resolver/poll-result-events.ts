import { FormContainerProps } from '../form-container-props';
import { FormFlowItem } from 'checkout/form-flow';
import { resolveStage } from 'checkout/lifecycle';
import { resolveEvents } from './card-pay/resolve-events';

const stageName = 'cardPayment';

export const pollResultEvents = (p: FormContainerProps, i: FormFlowItem) => {
    const shortened = resolveStage.bind(null, p.cardPayment, p.changeStepStatus, stageName);
    resolveEvents(shortened, p, true);
};
