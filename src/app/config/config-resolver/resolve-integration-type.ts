import intersection from 'lodash-es/intersection';
import { IntegrationType } from '../integration-type';
import { UserConfig } from './user-config';

const typesDef = [
    {
        type: IntegrationType.invoiceTemplate,
        requiredFields: ['invoiceTemplateID', 'invoiceTemplateAccessToken']
    },
    {
        type: IntegrationType.invoice,
        requiredFields: ['invoiceID', 'invoiceAccessToken']
    },
    {
        type: IntegrationType.customer,
        requiredFields: ['customerID', 'customerAccessToken']
    }
];

export const resolveIntegrationType = (userConfig: UserConfig): IntegrationType | null => {
    if (!userConfig) {
        return null;
    }
    const configFields = Object.keys(userConfig);
    const requiredFieldsCount = 2;
    const found = typesDef.find((typeDef) =>
        intersection(typeDef.requiredFields, configFields).length === requiredFieldsCount);
    return found ? found.type : null;
};
