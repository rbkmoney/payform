import difference from 'lodash-es/difference';
import intersection from 'lodash-es/intersection';
import { IntegrationType } from '../integration-type';

interface TypeDef {
    type: IntegrationType.invoiceTemplate;
    requiredFields: string[];
}

const integrationTypes = [
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
] as TypeDef[];

export function resolveIntegrationType(userConfig: any): IntegrationType | null {
    if (!userConfig) {
        return null;
    }
    const configFields = Object.keys(userConfig);
    const result: IntegrationType[] = [];
    integrationTypes.forEach((typeDef) => {
        if (difference(typeDef.requiredFields, intersection(typeDef.requiredFields, configFields)).length === 0) {
            result.push(typeDef.type);
        }
    });
    return result.length === 1 ? result[0] : null;
}
