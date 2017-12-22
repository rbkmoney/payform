import { FormContainerProps } from '../form-container-props';
import { resolveStage } from 'checkout/lifecycle';
import { continuePolling } from './card-pay/resolve-events';
import { resolveIntegrationType } from './card-pay/resolve-integration-type';
import { CardFormFlowItem, FormName, getByFormName } from 'checkout/form-flow';

const stageName = 'cardPayment';

export const getPaymentResult = (p: FormContainerProps) => {
    const shortened = resolveStage.bind(null, p.cardPayment, p.changeStepStatus, stageName);
    resolveIntegrationType(shortened, p, getByFormName(p.formsFlow, FormName.cardForm) as CardFormFlowItem);
    continuePolling(shortened, p);
};
