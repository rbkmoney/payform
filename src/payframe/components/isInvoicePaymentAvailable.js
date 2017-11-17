import toNumber from 'lodash/toNumber';

function isInvoicePaymentAvailable(props) {
    const isInvoiceWithTemplateCreated = props.integration.invoiceAccessToken;
    if (isInvoiceWithTemplateCreated) {
        const templateType = props.integration.invoiceTemplate.details.templateType;
        switch (templateType) {
            case 'InvoiceTemplateSingleLine': {
                const costType = props.integration.invoiceTemplate.details.price.costType;
                if (costType !== 'InvoiceTemplateLineCostFixed') {
                    const formAmount = toNumber(props.viewData.cardForm.amount.value) * 100;
                    const invoiceAmount = props.integration.invoice.amount;
                    return (formAmount === invoiceAmount);
                } else {
                    return true;
                }
            }
            case 'InvoiceTemplateMultiLine':
                return true;
        }
    } else {
        return false;
    }
}

export default isInvoicePaymentAvailable;
