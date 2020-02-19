import { PaymentMethod, PaymentMethodName, PaymentMethodGroupName } from 'checkout/state';
import { logUnavailableWithConfig } from './log-unavailable-with-config';
import { TerminalProviders } from '../../../../backend';
import { isEmpty } from 'lodash-es';

const mapPaymentMethodNameByProvider: { [P in TerminalProviders]: PaymentMethodName } = {
    euroset: PaymentMethodName.Euroset,
    zotapay: PaymentMethodName.ZotaPay
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
            const paymentMethods = providers
                .map((p: TerminalProviders) =>
                    mapPaymentMethodNameByProvider[p] ? { name: mapPaymentMethodNameByProvider[p] } : null
                )
                .filter((m) => m);
            if (paymentMethods.length > 0) {
                return [
                    {
                        name: PaymentMethodGroupName.Terminals,
                        children: paymentMethods
                    }
                ];
            }
        }
    }
    return [];
};
