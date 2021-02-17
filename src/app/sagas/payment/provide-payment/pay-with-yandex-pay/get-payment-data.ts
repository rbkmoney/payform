import { v4 as uuidv4 } from 'uuid';

import { AmountInfoState } from 'checkout/state';
import { toDisplayAmount } from 'checkout/utils';

export const getPaymentData = (
    merchantID: string,
    gatewayMerchantId: string,
    amountInfo: AmountInfoState,
    formAmount: string
): YaPay.PaymentData => {
    return {
        env: YaPay.PaymentEnv.Sandbox,
        version: 2,
        countryCode: YaPay.CountryCode.Ru,
        currencyCode: YaPay.CurrencyCode.Rub,
        merchant: {
            id: merchantID,
            name: 'RBKmoney'
        },
        order: {
            id: uuidv4(),
            total: {
                amount: toDisplayAmount(amountInfo, formAmount)
            }
        },
        paymentMethods: [
            {
                type: YaPay.PaymentMethodType.Card,
                gateway: 'yandex-trust',
                gatewayMerchantId,
                allowedAuthMethods: [YaPay.AllowedAuthMethod.PanOnly],
                allowedCardNetworks: [
                    YaPay.AllowedCardNetwork.Visa,
                    YaPay.AllowedCardNetwork.Mastercard,
                    YaPay.AllowedCardNetwork.Mir,
                    YaPay.AllowedCardNetwork.Uzcard
                ]
            }
        ]
    };
};
