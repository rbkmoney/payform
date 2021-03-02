import { resolveInitConfig } from './resolve-init-config';
import { IntegrationType, PaymentMethodName } from 'checkout/config';
import { HoldExpirationType } from 'checkout/backend';

it('should return resolved init config', () => {
    const param = {
        invoiceID: 'someID',
        invoiceAccessToken: 'some token',
        amount: '1000',
        obscureCardCvv: 'true',
        requireCardHolder: 'false',
        name: 'some name',
        description: 'some description',
        email: 'test@test.com',
        redirectUrl: 'some url',
        initialPaymentMethod: 'bankCard',
        theme: 'main',
        euroset: 'false'
    };

    const actual = resolveInitConfig(param);
    const expected = {
        integrationType: IntegrationType.invoice,
        invoiceID: 'someID',
        invoiceAccessToken: 'some token',
        wallets: true,
        bankCard: true,
        applePay: true,
        googlePay: true,
        samsungPay: true,
        yandexPay: true,
        mobileCommerce: true,
        paymentFlowHold: false,
        recurring: false,
        holdExpiration: HoldExpirationType.cancel,
        locale: 'auto',
        initialPaymentMethod: PaymentMethodName.bankCard,
        euroset: false,
        uzcard: true,
        qps: true,
        requireCardHolder: false,
        obscureCardCvv: true,
        amount: 1000,
        email: 'test@test.com',
        description: 'some description',
        // @ts-ignore
        metadata: undefined,
        name: 'some name',
        redirectUrl: 'some url',
        theme: 'main'
    };
    expect(actual).toEqual(expected);
});
