import toNumber from 'lodash/toNumber';

export default function(props) {
    const isInvoiceWithTemplateCreated = props.integration.invoiceAccessToken;
    if (isInvoiceWithTemplateCreated) {
        const templateType = props.integration.invoiceTemplate.details.price.costType;
        switch (templateType) {
            case 'InvoiceTemplateLineCostRange':
            case 'InvoiceTemplateLineCostUnlim': {
                const formAmount = toNumber(props.viewData.cardForm.amount.value) * 100;
                const invoiceAmount = props.integration.invoice.amount;
                return isInvoiceWithTemplateCreated ? !!(formAmount && formAmount === invoiceAmount) : false;
            }
            case 'InvoiceTemplateLineCostFixed':
                return !!isInvoiceWithTemplateCreated;
        }
    } else {
        return false;
    }
}