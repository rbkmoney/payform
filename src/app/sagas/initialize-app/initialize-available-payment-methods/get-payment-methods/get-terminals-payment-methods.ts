import { PaymentMethod, PaymentMethodName } from 'checkout/state';
import { logUnavailableWithConfig } from './log-unavailable-with-config';
import { TerminalProviders } from '../../../../backend';

const mapPaymentMethodNameByProvider: { [P in TerminalProviders]: PaymentMethodName } = {
    euroset: PaymentMethodName.Euroset,
    qps: PaymentMethodName.QPS
};

export const getTerminalsPaymentMethods = (
    methods: { qps?: boolean; euroset?: boolean; terminals?: boolean } = {},
    providers: TerminalProviders[],
    paymentFlowHold: boolean,
    recurring: boolean
): PaymentMethod[] => {
    if (paymentFlowHold) {
        logUnavailableWithConfig('terminals', 'paymentFlowHold');
        return [];
    }
    if (recurring) {
        logUnavailableWithConfig('terminals', 'recurring');
        return [];
    }
    return providers
        .filter(
            (p) =>
                (p === 'qps' && (methods.qps || methods.terminals)) ||
                (p === 'euroset' && (methods.euroset || methods.terminals))
        )
        .map((p) => ({ name: mapPaymentMethodNameByProvider[p] }));
};
