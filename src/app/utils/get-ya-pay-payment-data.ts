import { v4 as uuid } from 'uuid';

enum AllowedCardNetwork {
    Mastercard = 'MASTERCARD',
    Visa = 'VISA',
    Mir = 'MIR',
    Maestro = 'MAESTRO',
    Visaelectron = 'VISAELECTRON'
}

export const getYaPayPaymentData = (
    merchantID: string,
    gatewayMerchantId: string,
    order?: YaPay.Order
): YaPay.PaymentData => ({
    env: YaPay.PaymentEnv.Production,
    version: 2,
    countryCode: YaPay.CountryCode.Ru,
    currencyCode: YaPay.CurrencyCode.Rub,
    merchant: {
        id: merchantID,
        name: 'RBKmoney'
    },
    order: {
        ...(order || {}),
        id: order && order.id ? order.id : uuid()
    } as YaPay.Order,
    paymentMethods: [
        {
            type: YaPay.PaymentMethodType.Card,
            gateway: 'rbkmoney',
            gatewayMerchantId,
            allowedAuthMethods: [YaPay.AllowedAuthMethod.PanOnly, YaPay.AllowedAuthMethod.CloudToken],
            allowedCardNetworks: [
                AllowedCardNetwork.Visa,
                AllowedCardNetwork.Mastercard,
                AllowedCardNetwork.Mir,
                AllowedCardNetwork.Maestro,
                AllowedCardNetwork.Visaelectron
            ]
        }
    ]
});
