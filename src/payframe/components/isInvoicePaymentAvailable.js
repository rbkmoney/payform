import toNumber from 'lodash/toNumber';

function isInvoicePaymentAvailable(props) {
    if (!props.integration.invoiceAccessToken) {
        return false;
    }
    const details = props.integration.invoiceTemplate.details;
    const isSingeLine = details.templateType === 'InvoiceTemplateSingleLine';
    const isNotFixed = details.price && details.price.costType !== 'InvoiceTemplateLineCostFixed';
    let result = true;
    if (isSingeLine && isNotFixed) {
        const formAmount = toNumber(props.viewData.cardForm.amount.value) * 100;
        const invoiceAmount = props.integration.invoice.amount;
        result = (formAmount === invoiceAmount);
    }
    return result;
}

export default isInvoicePaymentAvailable;
