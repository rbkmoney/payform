import { PaymentMethod, PaymentMethodName } from 'checkout/state';
import { logUnavailableWithConfig } from './log-unavailable-with-config';
import { TerminalProviders } from '../../../../backend';
import { isEmpty } from 'lodash-es';

const mapPaymentMethodNameByProvider: { [P in TerminalProviders]: PaymentMethodName } = {
    euroset: PaymentMethodName.Euroset,
    qps: PaymentMethodName.QPS
};

export const getTerminalsPaymentMethods = (
    isMethod: boolean,
    providers: TerminalProviders[],
    paymentFlowHold: boolean,
    recurring: boolean
): PaymentMethod[] => {
    if (isMethod) {
        if (paymentFlowHold) {
            logUnavailableWithConfig('terminals', 'paymentFlowHold');
        } else if (recurring) {
            logUnavailableWithConfig('terminals', 'recurring');
        } else if (!isEmpty(providers)) {
            return providers
                .map((p) => (mapPaymentMethodNameByProvider[p] ? { name: mapPaymentMethodNameByProvider[p] } : null))
                .filter((m) => m);
        }
    }
    return [];
};
