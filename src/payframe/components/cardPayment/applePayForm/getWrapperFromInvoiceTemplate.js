import toNumber from 'lodash/toNumber';
import { ApplePayWrapper } from '../../../applePay';

/**
 * @param {Object} param
 * @param {string} param.validationEndpoint
 * @param {string} param.merchantID
 * @param {string} param.host
 * @param {Object} param.invoiceTemplate
 * @param {string} param.formAmount
 */
function getWrapperFromInvoiceTemplate(param) {
    const cost = param.invoiceTemplate.value;
    return new ApplePayWrapper({
        validationEndpoint: param.validationEndpoint,
        merchantID: param.merchantID,
        host: param.host,
        amount: cost.invoiceTemplateCostType === 'InvoiceTemplateCostFixed'
            ? cost.amount
            : toNumber(param.formAmount) * 100,
        product: param.invoiceTemplate.product
    });
}

export default getWrapperFromInvoiceTemplate;
