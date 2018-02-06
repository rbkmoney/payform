import values from 'lodash-es/values';
import { FieldsConfig, ItemConfig } from './fields-config';

export const calcFormHeight = (defaultHeight: number, fieldsConfig: FieldsConfig): number => {
    const count = values(fieldsConfig)
        .reduce((acc: number, current: ItemConfig) => current.visible ? ++acc : acc, 0);
    return defaultHeight + count * 52;
};
