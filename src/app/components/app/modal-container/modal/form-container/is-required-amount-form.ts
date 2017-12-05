import { InitConfig, IntegrationType } from 'checkout/config';
import { ModelState } from 'checkout/state';
import { InvoiceTemplate, InvoiceTemplateSingleLine } from 'checkout/backend';

const checkSingleLine = (details: InvoiceTemplateSingleLine): boolean => {
    const price = details.price;
    return price && price.costType !== 'InvoiceTemplateLineCostFixed';
};

const hasOpenAmount = (invoiceTemplate: InvoiceTemplate): boolean => {
    switch (invoiceTemplate.details.templateType) {
        case 'InvoiceTemplateSingleLine':
            return checkSingleLine(invoiceTemplate.details as InvoiceTemplateSingleLine);
    }
    return false;
};

export const isRequiredAmountForm = (initConfig: InitConfig, model: ModelState): boolean => {
    const integrationType = initConfig.integrationType;
    switch (integrationType) {
        case IntegrationType.invoiceTemplate:
            return hasOpenAmount(model.invoiceTemplate);
    }
    return false;
};
