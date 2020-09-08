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
    }
    if (recurring) {
        logUnavailableWithConfig('terminals', 'recurring');
    }
    const isQPS = methods.qps || methods.terminals;
    const isEuroset = methods.euroset || methods.terminals;
    return providers.reduce((acc, p) => {
        const name = mapPaymentMethodNameByProvider[p];
        if ((p === 'qps' && isQPS) || (p === 'euroset' && isEuroset)) {
            acc.push({ name });
        }
        return acc;
    }, [] as PaymentMethod[]);
};
