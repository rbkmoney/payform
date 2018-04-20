import {
    CostType,
    InvoiceTemplateSingleLine,
    InvoiceTemplateLineCost,
    InvoiceTemplateDetails,
    TemplateType
} from 'checkout/backend';
import { InitConfig, IntegrationType } from 'checkout/config';
import { ModelState } from 'checkout/state';

const isPrefilledTemplateCost = (cost: InvoiceTemplateLineCost): boolean => {
    switch (cost.costType) {
        case CostType.InvoiceTemplateLineCostFixed:
            return true;
        case CostType.InvoiceTemplateLineCostRange:
        case CostType.InvoiceTemplateLineCostUnlim:
            return false;
    }
};

const isPrefilledTemplateDetails = (details: InvoiceTemplateDetails): boolean => {
    switch (details.templateType) {
        case TemplateType.InvoiceTemplateMultiLine:
            return false;
        case TemplateType.InvoiceTemplateSingleLine:
            return isPrefilledTemplateCost((details as InvoiceTemplateSingleLine).price);
    }
};

export const isPrefilled = (initConfig: InitConfig, model: ModelState): boolean => {
    if (!initConfig.email) {
        return false;
    }
    if (!initConfig.amount) {
        switch (initConfig.integrationType) {
            case IntegrationType.invoice:
                return true;
            case IntegrationType.customer:
                return false;
            case IntegrationType.invoiceTemplate:
                return isPrefilledTemplateDetails(model.invoiceTemplate.details);
        }
    }
    return true;
};
