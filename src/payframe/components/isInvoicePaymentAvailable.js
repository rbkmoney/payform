import toNumber from 'lodash/toNumber';

function isInvoicePaymentAvailable(props) {
    const isInvoiceWithTemplateCreated = props.integration.invoiceAccessToken;
    if (isInvoiceWithTemplateCreated) {
        console.log(props.integration.invoiceTemplate);
        const templateType = props.integration.invoiceTemplate.details.templateType;
        switch (templateType) {
            case 'InvoiceTemplateSingleLine': {
                const formAmount = toNumber(props.viewData.cardForm.amount.value) * 100;
                const invoiceAmount = props.integration.invoice.amount;
                return (formAmount === invoiceAmount);
            }
            case 'InvoiceTemplateMultiLine':
                return true;
        }
    } else {
        return false;
    }
}

export default isInvoicePaymentAvailable;