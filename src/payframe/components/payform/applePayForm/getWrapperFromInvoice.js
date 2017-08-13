import { ApplePayWrapper } from '../../../apple-pay';

/**
 * @param {Object} param
 * @param {string} param.validationEndpoint
 * @param {string} param.merchantID
 * @param {string} param.host
 * @param {Object} param.invoice
 */
function getWrapperFromInvoice(param) {
    return new ApplePayWrapper({
        validationEndpoint: param.validationEndpoint,
        merchantID: param.merchantID,
        host: param.host,
        amount: param.invoice.amount,
        product: param.invoice.product
    });
}

export default getWrapperFromInvoice;
