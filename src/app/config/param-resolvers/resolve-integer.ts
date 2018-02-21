import isInteger from 'lodash-es/isInteger';
import toNumber from 'lodash-es/toNumber';
import isNumber from 'lodash-es/isNumber';
import isString from 'lodash-es/isString';
import { getMessageInvalidValue } from 'checkout/log-messages';

const getFromNumber = (userAmount: number): number | null =>
    isInteger(userAmount) ? userAmount : undefined;

const getFromString = (userAmount: string): number | null =>
    getFromNumber(toNumber(userAmount));

export const resolveInteger = (userAmount: any, fieldName: string): number | null => {
    if (!userAmount) {
        return null;
    }
    let result = null;
    if (isNumber(userAmount)) {
        result = getFromNumber(userAmount);
    } else if (isString(userAmount)) {
        result = getFromString(userAmount);
    }
    if (!result) {
        console.warn(getMessageInvalidValue(fieldName, userAmount, 'Value should be positive integer.'));
    }
    return result;
};
