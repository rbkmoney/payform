import isString from 'lodash-es/isString';
import isEmpty from 'lodash-es/isEmpty';
import { getMessageInvalidValue } from '../../log-messages';

const getString = (userString: any): string => {
    let result = null;
    if (isString(userString)) {
        const trimmed = userString.trim();
        if (!isEmpty(trimmed)) {
            result = trimmed;
        }
    }
    return result;
};

const log = (userString: any, fieldName: string) =>
    console.warn(getMessageInvalidValue(fieldName, userString, 'Value should be non empty string.'));

export const resolveString = (userString: any, fieldName: string): string => {
    if (!userString) {
        return null;
    }
    const result = getString(userString);
    if (!result) {
        log(result, fieldName);
    }
    return result;
};
