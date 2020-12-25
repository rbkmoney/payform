import { createSelector } from 'reselect';
import { getPaymentToolSelector } from './get-payment-tool-selector';

export const isInteractionPopOutSelector = createSelector(getPaymentToolSelector, (paymentTool) => {
    return paymentTool.provider === 'uzcard';
});
