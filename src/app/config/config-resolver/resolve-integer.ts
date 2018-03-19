import isInteger from 'lodash-es/isInteger';
import toNumber from 'lodash-es/toNumber';
import isNumber from 'lodash-es/isNumber';
import isString from 'lodash-es/isString';
import { getMessageInvalidValue } from '../../log-messages';

const getFromNumber = (userInteger: number): number | null =>
    isInteger(userInteger) ? userInteger : undefined;

const getFromString = (userInteger: string): number | null =>
    getFromNumber(toNumber(userInteger));

const getInteger = (userInteger: any) => {
    if (!userInteger) {
        return null;
    }
    let result = null;
    if (isNumber(userInteger)) {
        result = getFromNumber(userInteger);
    } else if (isString(userInteger)) {
        result = getFromString(userInteger);
    }
    return result;
};

const log = (userInteger: any, fieldName: string) =>
    console.warn(getMessageInvalidValue(fieldName, userInteger, 'Value should be positive integer.'));

export const resolveInteger = (userInteger: any, fieldName: string): number | null => {
    if (!userInteger) {
        return null;
    }
    const result = getInteger(userInteger);
    if (!result) {
        log(userInteger, fieldName);
    }
    return result;
};
