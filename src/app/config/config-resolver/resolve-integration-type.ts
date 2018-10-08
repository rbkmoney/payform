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

interface Resolved {
    integrationType: IntegrationType;
    [key: string]: string;
}

export const resolveIntegrationType = (userConfig: UserConfig): Resolved => {
    if (!userConfig) {
        return null;
    }
    const configFields = Object.keys(userConfig);
    const found = typesDef.find((typeDef) => intersection(typeDef.requiredFields, configFields).length === 2);
    if (!found) {
        return null;
    }
    return found.requiredFields.reduce(
        (acc, current) => ({
            ...acc,
            [current]: (userConfig as { [param: string]: string })[current]
        }),
        { integrationType: found.type }
    );
};
