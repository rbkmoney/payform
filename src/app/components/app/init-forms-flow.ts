import { InitConfig, IntegrationType } from 'checkout/config';
import { FormFlowItem, FormName, ModelState } from 'checkout/state';
import { InvoiceTemplate, InvoiceTemplateSingleLine } from 'checkout/backend';
import { add, init } from './form-flow-manager';

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

const isRequiredAmount = (initConfig: InitConfig, model: ModelState): boolean => {
    const integrationType = initConfig.integrationType;
    switch (integrationType) {
        case IntegrationType.invoiceTemplate:
            return hasOpenAmount(model.invoiceTemplate);
    }
    return false;
};

const isMultiMethods = (initConfig: InitConfig, model: ModelState) => {
    return initConfig.terminals && model.paymentMethods.length > 1;
};

export const initFormsFlow = (initConfig: InitConfig, model: ModelState): FormFlowItem[] => {
    let result: FormFlowItem[] = [];
    if (isMultiMethods(initConfig, model)) {
        result = add(result, FormName.paymentMethods);
    } else {
        result = add(result, FormName.cardForm);
    }
    result = init(result);
    return result;
};
