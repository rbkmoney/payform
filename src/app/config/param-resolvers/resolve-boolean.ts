import isBoolean from 'lodash-es/isBoolean';
import isString from 'lodash-es/isString';
import { getMessageInvalidValue } from 'checkout/log-messages';

const toBoolean = (str: string): boolean => {
    switch (str) {
        case 'true':
            return true;
        case 'false':
            return false;
        default:
            return;
    }
};

export const resolveBoolean = (userBoolean: any, fieldName: string): boolean | null => {
    if (!userBoolean) {
        return null;
    }
    let result = null;
    if (isBoolean(userBoolean)) {
        result = userBoolean;
    } else if (isString(userBoolean)) {
        result = toBoolean(userBoolean);
    }
    if (!result) {
        console.warn(getMessageInvalidValue(fieldName, userBoolean, 'Value should be boolean.'));
    }
    return result;
};
