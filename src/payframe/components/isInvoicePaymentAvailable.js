import toNumber from 'lodash/toNumber';

function isInvoicePaymentAvailable(props) {
    const isInvoiceWithTemplateCreated = props.integration.invoiceAccessToken;
    if (isInvoiceWithTemplateCreated) {
        const templateType = props.integration.invoiceTemplate.details.price.costType;
        switch (templateType) {
            case 'InvoiceTemplateLineCostRange':
            case 'InvoiceTemplateLineCostUnlim': {
                const formAmount = toNumber(props.viewData.cardForm.amount.value) * 100;
                const invoiceAmount = props.integration.invoice.amount;
                return (formAmount === invoiceAmount);
            }
            case 'InvoiceTemplateLineCostFixed':
                return true;
        }
    } else {
        return false;
    }
}

export default isInvoicePaymentAvailable;