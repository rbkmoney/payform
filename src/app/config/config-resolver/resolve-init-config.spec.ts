import { resolveIntegrationType } from './resolve-integration-type';
import { resolveInitConfig } from './resolve-init-config';
import { IntegrationType, PaymentMethodName } from 'checkout/config';
import { resolveInteger } from './resolve-integer';
import { resolveBoolean } from './resolve-boolean';
import { resolveString } from './resolve-string';
import { HoldExpirationType } from 'checkout/backend';

jest.mock('./resolve-integration-type');
jest.mock('./resolve-integer');
jest.mock('./resolve-boolean');
jest.mock('./resolve-string');
const resolveIntegrationTypeMocked = resolveIntegrationType as any;
const resolveIntegerMocked = resolveInteger as any;
const resolveBooleanMocked = resolveBoolean as any;
const resolveStringMocked = resolveString as any;

it('should return resolved init config', () => {
    const param = {
        invoiceID: 'someID',
        invoiceAccessToken: 'some token',
        amount: 1000,
        obscureCardCvv: true,
        requireCardHolder: false,
        name: 'some name',
        description: 'some description',
        email: 'test@test.com',
        redirectUrl: 'some url',
        initialPaymentMethod: 'bankCard'
    };
    resolveIntegrationTypeMocked.mockReturnValueOnce({
        integrationType: IntegrationType.invoice,
        invoiceID: 'someID',
        invoiceAccessToken: 'some token'
    });
    resolveIntegerMocked.mockReturnValueOnce(param.amount);
    resolveBooleanMocked
        .mockReturnValueOnce(param.obscureCardCvv)
        .mockReturnValueOnce(param.requireCardHolder)
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(null);
    resolveStringMocked
        .mockReturnValueOnce(param.name)
        .mockReturnValueOnce(param.description)
        .mockReturnValueOnce(param.email)
        .mockReturnValueOnce(param.redirectUrl)
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(param.initialPaymentMethod);

    const actual = resolveInitConfig(param);
    const expected = {
        integrationType: IntegrationType.invoice,
        invoiceID: 'someID',
        invoiceAccessToken: 'some token',
        terminals: true,
        wallets: true,
        bankCard: true,
        paymentFlowHold: false,
        holdExpiration: HoldExpirationType.cancel,
        locale: 'auto',
        initialPaymentMethod: PaymentMethodName.bankCard,
        ...param
    };
    expect(actual).toEqual(expected);
});
