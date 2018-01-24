import { values } from 'lodash';
import { FieldsConfig, ItemConfig } from '../fields-config';

export const calcHeight = (fieldsConfig: FieldsConfig): number => {
    const count = values(fieldsConfig)
        .reduce((acc: number, current: ItemConfig) => current.visible ? ++acc : acc, 0);
    return 288 + count * 52;
};
