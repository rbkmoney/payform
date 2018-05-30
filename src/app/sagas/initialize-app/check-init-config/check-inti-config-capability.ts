import isNil from 'lodash-es/isNil';
import { InitConfig } from 'checkout/config';
import { ModelState } from 'checkout/state';
import { logPrefix, sadnessMessage } from 'checkout/log-messages';
import { CheckResult, UnavailableReason } from './check-result';
import { checkAmount } from './check-amount';
import { checkBankCard } from './check-bank-card';

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

export const checkInitConfigCapability = (c: InitConfig, m: ModelState): InitConfig => ({
    ...c,
    amount: checkAndLog('amount', c, checkAmount.bind(null, c.integrationType, m, c.amount)) ? c.amount : null,
    bankCard: checkAndLog('bankCard', c, checkBankCard.bind(null, c, m.paymentMethods)) ? c.bankCard : true
});
