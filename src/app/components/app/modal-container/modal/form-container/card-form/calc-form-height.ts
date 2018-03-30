import values from 'lodash-es/values';
import { FieldsConfig } from '../fields-config';

export const calcFormHeight = (config: FieldsConfig): number => {
    const fieldsCount = values(config).filter((current) => current.visible).length;
    const fieldHeight = 52;
    const defaultHeight = 236;
    const min = 1;
    return defaultHeight + (fieldsCount < min ? min : fieldsCount) * fieldHeight;
};
