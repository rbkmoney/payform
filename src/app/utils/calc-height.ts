import { values } from 'lodash';
import { FieldsConfig, ItemConfig } from '../components/app/modal-container/modal/form-container/fields-config/index';

export const calcHeight = (defaultHeight: number, fieldsConfig: FieldsConfig): number => {
    const count = values(fieldsConfig)
        .reduce((acc: number, current: ItemConfig) => current.visible ? ++acc : acc, 0);
    return defaultHeight + count * 52;
};
