import isNil from 'lodash-es/isNil';
import { InitConfig } from 'checkout/config';
import { ModelState } from 'checkout/state';
import { CheckResult, logUnavailableResult } from 'checkout/sagas/log-unavailable-result';
import { checkAmount } from './check-amount';
import { checkBankCard } from './check-bank-card';
import { checkInitialPaymentMethod } from './check-initial-payment-method';

type CheckFn = () => CheckResult;

const checkAndLog = (paramName: keyof InitConfig, initConfig: InitConfig, checkFn: CheckFn): boolean => {
    let result = false;
    if (!isNil(initConfig[paramName])) {
        const checkResult = checkFn();
        checkResult.available ? (result = true) : logUnavailableResult(paramName, checkResult);
    }
    return result;
};

const firstCheck = (userConfig: InitConfig, m: ModelState): InitConfig => ({
    ...userConfig,
    amount: checkAndLog('amount', userConfig, checkAmount.bind(null, userConfig.integrationType, m, userConfig.amount))
        ? userConfig.amount
        : null,
    bankCard: checkAndLog('bankCard', userConfig, checkBankCard.bind(null, userConfig, m.paymentMethods))
        ? userConfig.bankCard
        : true
});

// TODO: Description
export const checkInitConfigCapability = (c: InitConfig, m: ModelState): InitConfig => {
    const checked = firstCheck(c, m);
    return {
        ...checked,
        initialPaymentMethod: checkAndLog(
            'initialPaymentMethod',
            checked,
            checkInitialPaymentMethod.bind(null, checked, m.paymentMethods)
        )
            ? checked.initialPaymentMethod
            : null
    };
};
