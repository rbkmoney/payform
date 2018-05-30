import isNil from 'lodash-es/isNil';
import { InitConfig } from 'checkout/config';
import { ModelState } from 'checkout/state';
import { logPrefix, sadnessMessage } from 'checkout/log-messages';
import { CheckResult, UnavailableReason } from './check-result';
import { checkAmount } from './check-amount';
import { checkBankCard } from './check-bank-card';
import { checkInitialPaymentMethod } from './check-initial-payment-method';

const logUnavailableResult = (param: string, result: CheckResult) => {
    if (result.available) {
        return;
    }
    const prepareMessage = (availability: string) => `${logPrefix} Param '${param}' is ${availability}. ${result.message} ${sadnessMessage}`;
    let message;
    switch (result.reason) {
        case UnavailableReason.capability:
            message = prepareMessage('unavailable');
            break;
        case UnavailableReason.validation:
            message = prepareMessage('invalid');
            break;
    }
    console.warn(message);
};

type CheckFn = () => CheckResult;

const checkAndLog = (paramName: string, initConfig: InitConfig, checkFn: CheckFn): boolean => {
    const usableByIndex = initConfig as any;
    let result = false;
    if (!isNil(usableByIndex[paramName])) {
        const checkResult = checkFn();
        checkResult.available ? result = true : logUnavailableResult(paramName, checkResult);
    }
    return result;
};

const firstCheck = (userConfig: InitConfig, m: ModelState): InitConfig => ({
    ...userConfig,
    amount: checkAndLog('amount', userConfig, checkAmount.bind(null, userConfig.integrationType, m, userConfig.amount)) ? userConfig.amount : null,
    bankCard: checkAndLog('bankCard', userConfig, checkBankCard.bind(null, userConfig, m.paymentMethods)) ? userConfig.bankCard : true,
});

export const checkInitConfigCapability = (c: InitConfig, m: ModelState): InitConfig => {
    const checked = firstCheck(c, m);
    return {
        ...checked,
        initialPaymentMethod: checkAndLog('initialPaymentMethod', checked, checkInitialPaymentMethod.bind(null, checked, m.paymentMethods)) ? checked.initialPaymentMethod : null
    };
};
