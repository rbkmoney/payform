import { resolveEvents } from './resolve-events';
import { resolvePayment } from './resolve-payment';
import { CardFormFlowItem } from 'checkout/form-flow/flow-item';
import { FormContainerProps } from '../../form-container-props';
import { resolveStage } from 'checkout/lifecycle';
import { resolveIntegrationType } from './resolve-integration-type';
import { resolvePaymentResource } from './resolve-payment-resource';

const stageName = 'cardPayment';

export const pay = (p: FormContainerProps, i: CardFormFlowItem) => {
    const shortened = resolveStage.bind(null, p.cardPayment, p.changeStepStatus, stageName);
    resolveIntegrationType(shortened, p, i);
    resolvePaymentResource(shortened, p, i);
    resolvePayment(shortened, p, i);
    resolveEvents(shortened, p);
};
