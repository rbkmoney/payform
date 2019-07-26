import isString from 'lodash-es/isString';
import { getMessageInvalidValue } from '../../log-messages';

const getObject = (inputObject: object | string): object => {
    if (!isString(inputObject)) {
        try {
            inputObject = JSON.stringify(inputObject);
        } catch (e) {
            return null;
        }
    }
    if (inputObject.trim()[0] === '{') {
        try {
            return JSON.parse(inputObject);
        } catch (e) {
            return null;
        }
    }
    return null;
};

const log = (inputObject: any, fieldName: string) =>
    console.warn(getMessageInvalidValue(fieldName, inputObject, 'Value should be non empty object.'));

export const resolveObject = (inputObject: object | string, fieldName: string): object => {
    if (!inputObject) {
        return null;
    }
    const result = getObject(inputObject);
    if (!result) {
        log(result, fieldName);
    }
    return result;
};
