import { CheckResult, UnavailableReason } from 'checkout/sagas/log-unavailable-result';
import { InitConfig, IntegrationType, PaymentMethodName as PaymentMethodNameConfig } from 'checkout/config';
import { BankCardTokenProvider, PaymentMethod, PaymentMethodName, PaymentTerminal } from 'checkout/backend';

const checkBankCard = (bankCard: boolean, paymentMethods: PaymentMethod[]): CheckResult => {
    if (!bankCard) {
        return {
            available: false,
            reason: UnavailableReason.capability,
            message: "BankCard disabled (Integration param 'bankCard':'false')."
        };
    }
    const found = paymentMethods.find(
        (method: PaymentMethod & { tokenProviders?: BankCardTokenProvider[] }) =>
            method.method === PaymentMethodName.BankCard && !Array.isArray(method.tokenProviders)
    );
    return found
        ? { available: true }
        : {
              available: false,
              reason: UnavailableReason.capability,
              message: "Value 'bankCard' can not applied. Payment method BankCard is not available for merchant."
          };
};

const checkTerminalEuroset = (euroset: boolean, paymentMethods: PaymentMethod[]): CheckResult => {
    if (!euroset) {
        return {
            available: false,
            reason: UnavailableReason.capability,
            message: "Euroset disabled (Integration param 'euroset':'false')."
        };
    }
    const found = paymentMethods.find(
        (method) =>
            method.method === PaymentMethodName.PaymentTerminal &&
            (method as PaymentTerminal).providers.includes('euroset')
    );
    return found
        ? { available: true }
        : {
              available: false,
              reason: UnavailableReason.capability,
              message:
                  "Value 'terminalEuroset' can not applied. Payment method PaymentTerminal/euroset is not available for merchant."
          };
};

const checkTerminalQPS = (qps: boolean, paymentMethods: PaymentMethod[]): CheckResult => {
    if (!qps) {
        return {
            available: false,
            reason: UnavailableReason.capability,
            message: "QPS disabled (Integration param 'qps':'false')."
        };
    }
    const found = paymentMethods.find(
        (method) =>
            method.method === PaymentMethodName.PaymentTerminal && (method as PaymentTerminal).providers.includes('qps')
    );
    return found
        ? { available: true }
        : {
              available: false,
              reason: UnavailableReason.capability,
              message:
                  "Value 'terminalQPS' can not applied. Payment method PaymentTerminal/qps is not available for merchant."
          };
};

const checkWalletQiwi = (wallets: boolean, paymentMethods: PaymentMethod[]): CheckResult => {
    if (!wallets) {
        return {
            available: false,
            reason: UnavailableReason.capability,
            message: "Digital wallets disabled (Integration param 'wallets':'false')."
        };
    }
    const found = paymentMethods.find((method) => method.method === PaymentMethodName.DigitalWallet);
    return found
        ? { available: true }
        : {
              available: false,
              reason: UnavailableReason.capability,
              message: "Value 'walletQiwi' can not applied. Payment method DigitalWallet is not available for merchant."
          };
};

const checkTokenizedBankCard = (
    isMethod: boolean,
    paymentMethods: PaymentMethod[],
    tokenProvider: BankCardTokenProvider,
    humanReadableParamName: string,
    paramName: string
) => {
    if (!isMethod) {
        const humanReadableParamNameWithCapital = `${humanReadableParamName[0].toUpperCase() +
            humanReadableParamName.slice(1)}`;
        return {
            available: false,
            reason: UnavailableReason.capability,
            message: `${humanReadableParamNameWithCapital} disabled (Integration param '${paramName}':'false').`
        };
    }
    const tokenizedPaymentMethod = paymentMethods.find(
        (method: PaymentMethod & { tokenProviders?: BankCardTokenProvider[] }) =>
            method.method === PaymentMethodName.BankCard &&
            Array.isArray(method.tokenProviders) &&
            method.tokenProviders.findIndex((provider) => provider === tokenProvider) >= 0
    );
    return tokenizedPaymentMethod
        ? { available: true }
        : {
              available: false,
              reason: UnavailableReason.capability,
              message: `Value '${paramName}' can not applied. Token provider '${tokenProvider}' for payment method 'BankCard' is not available for merchant.`
          };
};

const checkMobileCommerce = (mobileCommerce: boolean, paymentMethods: PaymentMethod[]): CheckResult => {
    if (!mobileCommerce) {
        return {
            available: false,
            reason: UnavailableReason.capability,
            message: "Mobile commerce disabled (Integration param 'mobileCommerce':'false')."
        };
    }
    const found = paymentMethods.find((method) => method.method === PaymentMethodName.MobileCommerce);
    return found
        ? { available: true }
        : {
              available: false,
              reason: UnavailableReason.capability,
              message:
                  "Value 'mobileCommerce' can not applied. Payment method mobileCommerce is not available for merchant."
          };
};

const checkForInvoiceAndTemplate = (initConfig: InitConfig, paymentMethods: PaymentMethod[]): CheckResult => {
    const {
        initialPaymentMethod,
        bankCard,
        wallets,
        applePay,
        googlePay,
        samsungPay,
        mobileCommerce,
        euroset,
        qps
    } = initConfig;
    switch (initialPaymentMethod) {
        case PaymentMethodNameConfig.bankCard:
            return checkBankCard(bankCard, paymentMethods);
        case PaymentMethodNameConfig.terminalEuroset:
            return checkTerminalEuroset(euroset, paymentMethods);
        case PaymentMethodNameConfig.terminalQPS:
            return checkTerminalQPS(qps, paymentMethods);
        case PaymentMethodNameConfig.walletQiwi:
            return checkWalletQiwi(wallets, paymentMethods);
        case PaymentMethodNameConfig.applePay:
            return checkTokenizedBankCard(
                applePay,
                paymentMethods,
                BankCardTokenProvider.applepay,
                'apple pay',
                'applePay'
            );
        case PaymentMethodNameConfig.googlePay:
            return checkTokenizedBankCard(
                googlePay,
                paymentMethods,
                BankCardTokenProvider.googlepay,
                'google pay',
                'googlePay'
            );
        case PaymentMethodNameConfig.samsungPay:
            return checkTokenizedBankCard(
                samsungPay,
                paymentMethods,
                BankCardTokenProvider.samsungpay,
                'samsung pay',
                'samsungPay'
            );
        case PaymentMethodNameConfig.mobileCommerce:
            return checkMobileCommerce(mobileCommerce, paymentMethods);
        default:
            return {
                available: false,
                reason: UnavailableReason.capability,
                message: `Value '${initialPaymentMethod}' is not supported.`
            };
    }
};

export const checkInitialPaymentMethod = (initConfig: InitConfig, paymentMethods: PaymentMethod[]): CheckResult => {
    const { initialPaymentMethod, integrationType } = initConfig;
    if (initialPaymentMethod === null) {
        return { available: true };
    }
    switch (integrationType) {
        case IntegrationType.invoiceTemplate:
        case IntegrationType.invoice:
            return checkForInvoiceAndTemplate(initConfig, paymentMethods);
        case IntegrationType.customer:
            return {
                available: false,
                reason: UnavailableReason.capability,
                message: "Param 'initialPaymentMethod' is only available for invoice and invoice template integration"
            };
    }
};
