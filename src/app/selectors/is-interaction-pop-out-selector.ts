import { createSelector } from 'reselect';
import { getPaymentToolSelector } from './get-payment-tool-selector';
import get from 'lodash-es/get';

export const isInteractionPopOutSelector = createSelector(getPaymentToolSelector, (paymentTool) => {
    return get(paymentTool, 'provider') === 'uzcard';
});
