import { resolveBoolean } from './resolve-boolean';
import { resolveInteger } from './resolve-integer';
import { InitConfig } from '../init-config';
import { resolveIntegrationType } from './resolve-integration-type';
import { UserConfig } from './user-config';
import { resolveString } from './resolve-string';
import { HoldExpirationType } from 'checkout/backend';
import { PaymentMethodName } from 'checkout/config/payment-method-name';
import { DEFAULT_THEME } from 'checkout/themes';
import { resolveObject } from './resolve-object';

const setDefault = <P, D>(userParam: P, defaultValue: D): P | D =>
    userParam === null || userParam === undefined ? defaultValue : userParam;

const checkUnknown = (resolvedParams: object, allParams: object): void => {
    const resolvedParamsKeys = Object.keys(resolvedParams);
    const unknownParams = Object.keys(allParams).filter(
        (param) => resolvedParamsKeys.findIndex((v) => v === param) === -1
    );
    if (unknownParams.length) {
        console.warn(`Unknown params: ${unknownParams.join(', ')}`);
    }
};

export const resolveInitConfig = (userConfig: UserConfig): InitConfig => {
    const resolvedIntegrationType = resolveIntegrationType(userConfig);
    if (!resolvedIntegrationType) {
        throw { code: 'error.unrecognized.integration.type' };
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
        bankCard,
        applePay,
        googlePay,
        samsungPay,
        paymentFlowHold,
        holdExpiration,
        locale,
        initialPaymentMethod,
        recurring,
        theme,
        metadata,
        ...restParams
    } = userConfig;
    checkUnknown(resolvedIntegrationType, restParams);
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
        bankCard: setDefault(resolveBoolean(bankCard, 'bankCard'), true),
        applePay: setDefault(resolveBoolean(applePay, 'applePay'), true),
        googlePay: setDefault(resolveBoolean(googlePay, 'googlePay'), true),
        samsungPay: setDefault(resolveBoolean(samsungPay, 'samsungPay'), true),
        paymentFlowHold: setDefault(resolveBoolean(paymentFlowHold, 'paymentFlowHold'), false),
        holdExpiration: setDefault(
            resolveString(holdExpiration, 'holdExpiration') as HoldExpirationType,
            HoldExpirationType.cancel
        ),
        locale: setDefault(resolveString(locale, 'locale'), 'auto'),
        initialPaymentMethod: resolveString(initialPaymentMethod, 'initialPaymentMethod') as PaymentMethodName,
        recurring: setDefault(resolveBoolean(recurring, 'recurring'), false),
        theme: setDefault(resolveString(theme, 'theme'), DEFAULT_THEME.name),
        metadata: setDefault(resolveObject(metadata, 'metadata'), undefined)
    };
};
