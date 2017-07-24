import { integrationTypes } from './dictionary';
import { difference, intersection } from 'lodash';

export default function(config) {
    const configFields = Object.keys(config);
    const result = [];
    integrationTypes.forEach((type) => {
        if (difference(type.fields, intersection(type.fields, configFields)).length === 0) {
            result.push(type.name);
        }
    });

    if (result.length === 1) {
        return result[0];
    } else {
        return 'error';
    }
}
