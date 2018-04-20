import { resolveBoolean } from './resolve-boolean';
import { resolveInteger } from './resolve-integer';
import { InitConfig } from '../init-config';
import { resolveIntegrationType } from './resolve-integration-type';
import { UserConfig } from './user-config';
import { resolveString } from './resolve-string';
import { HoldExpirationType } from 'checkout/backend';

const setDefault = (userParam: any, defaultValue: any) => userParam === null ? defaultValue : userParam;

export const resolveInitConfig = (userConfig: UserConfig): InitConfig => {
    const resolvedIntegrationType = resolveIntegrationType(userConfig);
    if (!resolvedIntegrationType) {
        throw {code: 'error.unrecognized.integration.type'};
    }
    const {
        name,
        description,
        email,
        amount,
        obscureCardCvv,
        requireCardHolder,
        redirectUrl,
        terminals,
        wallets,
        paymentFlowHold,
        holdExpiration,
        locale
    } = userConfig;
    return {
        ...resolvedIntegrationType,
        name: resolveString(name, 'name'),
        description: resolveString(description, 'description'),
        email: resolveString(email, 'email'),
        amount: resolveInteger(amount, 'amount'),
        obscureCardCvv: resolveBoolean(obscureCardCvv, 'obscureCardCvv'),
        requireCardHolder: resolveBoolean(requireCardHolder, 'requireCardHolder'),
        redirectUrl: resolveString(redirectUrl, 'redirectUrl'),
        terminals: setDefault(resolveBoolean(terminals, 'terminals'), true),
        wallets: setDefault(resolveBoolean(wallets, 'wallets'), true),
        paymentFlowHold: setDefault(resolveBoolean(paymentFlowHold, 'paymentFlowHold'), false),
        holdExpiration: setDefault(resolveString(holdExpiration, 'holdExpiration'), HoldExpirationType.cancel),
        locale: setDefault(resolveString(locale, 'locale'), 'auto')
    };
};
