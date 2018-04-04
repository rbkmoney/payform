import { resolveIntegrationType } from './resolve-integration-type';
import { resolveInitConfig } from './resolve-init-config';
import { IntegrationType } from 'checkout/config';
import { resolveInteger } from './resolve-integer';
import { resolveBoolean } from './resolve-boolean';
import { HoldExpirationType } from 'checkout/backend';

jest.mock('./resolve-integration-type');
jest.mock('./resolve-integer');
jest.mock('./resolve-boolean');
const resolveIntegrationTypeMocked = resolveIntegrationType as any;
const resolveIntegerMocked = resolveInteger as any;
const resolveBooleanMocked = resolveBoolean as any;

it('should return resolved init config', () => {
    const param = {
        invoiceID: 'someID',
        invoiceAccessToken: 'some token',
        amount: 1000,
        obscureCardCvv: true,
        requireCardHolder: true
    };

    resolveIntegrationTypeMocked.mockReturnValueOnce(IntegrationType.invoice);
    resolveIntegerMocked.mockReturnValueOnce(1000);
    resolveBooleanMocked
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(true);

    const actual = resolveInitConfig(param);
    const expected = {
        integrationType: IntegrationType.invoice,
        terminals: true,
        wallets: true,
        paymentFlowHold: false,
        holdExpiration: HoldExpirationType.cancel,
        locale: 'auto',
        ...param
    };
    expect(resolveIntegrationTypeMocked).toBeCalledWith(param);
    expect(resolveIntegerMocked).toBeCalledWith(param.amount, 'amount');
    expect(resolveBooleanMocked.mock.calls[0]).toEqual([param.obscureCardCvv, 'obscureCardCvv']);
    expect(resolveBooleanMocked.mock.calls[1]).toEqual([param.requireCardHolder, 'requireCardHolder']);
    expect(actual).toEqual(expected);
});
