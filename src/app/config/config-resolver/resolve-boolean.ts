import isBoolean from 'lodash-es/isBoolean';
import isString from 'lodash-es/isString';
import { getMessageInvalidValue } from '../../log-messages';

const toBoolean = (str: string): boolean => {
    switch (str) {
        case 'true':
            return true;
        case 'false':
            return false;
        default:
            return null;
    }
};

const getBoolean = (userBoolean: any): boolean | null => {
    let result = null;
    if (isBoolean(userBoolean)) {
        result = userBoolean;
    } else if (isString(userBoolean)) {
        result = toBoolean(userBoolean);
    }
    return result;
};

const log = (userBoolean: any, fieldName: string) =>
    console.warn(getMessageInvalidValue(fieldName, userBoolean, 'Value should be boolean.'));

export const resolveBoolean = (userBoolean: any, fieldName: string): boolean | null => {
    if (userBoolean === undefined) {
        return null;
    }
    const result = getBoolean(userBoolean);
    if (result === null) {
        log(userBoolean, fieldName);
    }
    return result;
};
