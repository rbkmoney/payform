import { InitConfig } from './init-config';
import { IntegrationType } from './integration-type';
import { intersection, difference } from 'lodash';

declare interface TypeDef {
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

export function getIntegrationType(config: InitConfig): IntegrationType | null {
    const configFields = Object.keys(config);
    const result: IntegrationType[] = [];
    integrationTypes.forEach((typeDef) => {
        if (difference(typeDef.requiredFields, intersection(typeDef.requiredFields, configFields)).length === 0) {
            result.push(typeDef.type);
        }
    });
    return result.length === 1 ? result[0] : null;
}
