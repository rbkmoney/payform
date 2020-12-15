import { PaymentMethod, PaymentMethodName } from 'checkout/state';
import { logUnavailableWithConfig } from './log-unavailable-with-config';
import { TerminalProviders } from '../../../../backend';

const mapPaymentMethodNameByProvider: { [P in TerminalProviders]: PaymentMethodName } = {
    euroset: PaymentMethodName.Euroset,
    qps: PaymentMethodName.QPS,
    uzcard: PaymentMethodName.Uzcard
};

export const getTerminalsPaymentMethods = (
    methods: { [P in TerminalProviders]?: boolean } = {},
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
                (p === 'qps' && methods.qps) ||
                (p === 'euroset' && methods.euroset) ||
                (p === 'uzcard' && methods.uzcard)
        )
        .map((p) => ({ name: mapPaymentMethodNameByProvider[p] }));
};
