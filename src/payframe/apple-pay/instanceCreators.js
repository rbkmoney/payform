import {toNumber} from 'lodash';
import ApplePayWrapper from './ApplePayWrapper';

function getInstanceFromInvoice(validationEndpoint, invoice) {
    return new ApplePayWrapper(validationEndpoint, invoice.amount, invoice.product);
}

function getInstanceFromInvoiceTemplate(validationEndpoint, invoiceTemplate, formAmount) {
    const cost = invoiceTemplate.cost;
    return new ApplePayWrapper(
        validationEndpoint,
        cost.invoiceTemplateCostType === 'InvoiceTemplateCostFixed'
            ? cost.amount / 100
            : toNumber(formAmount),
        invoiceTemplate.product
    );
}

export {getInstanceFromInvoice, getInstanceFromInvoiceTemplate}
